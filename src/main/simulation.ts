import { DefaultFitnessType, DefaultGenesType, SimulationOptions, SimulationStats, AgentWithScore } from "@/types";
import { StopCondition } from "@/functions";
import { Agent } from "./agent";
import { shuffle } from "@/utils";

/**
 * @description Group of two agents.
 * */
type AgentParents<ChromosomeType, FitnessType> = IterableIterator<[Agent<ChromosomeType, FitnessType>, Agent<ChromosomeType, FitnessType>]>;

/**
 * @description Simulates a genetic algorithm.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @typeParam FitnessType The type of the fitness score.
 * */
export class Simulation<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> {
    /** Population of the simulation */
    protected population: Agent<ChromosomeType, FitnessType>[] = [];
    /** Defines the current generation of the simulation */
    protected currentGeneration = 0;

    /**
     * @param properties The simulation options.
     * */
    constructor(protected readonly properties: SimulationOptions<ChromosomeType, FitnessType>) {
        this.population = this.properties.agentGenerator.createInitialPopulation();
    }

    /**
     * @description Computes the stores of the agents in parallel and awaits for the finish of the computation
     * of all the stores.
     * @returns The scores of the agents.
     * */
    protected async computeScores(): Promise<FitnessType[]> {
        const promises = this.population.map((agent) => agent.getScore());
        return Promise.all(promises);
    }

    /**
     * @description the stats of the obtained scores.
     * @param scores The scores of the agents.
     * @returns The stats of the obtained scores.
     * */
    protected computeStats(scores: AgentWithScore<ChromosomeType, FitnessType>[]): SimulationStats<ChromosomeType, FitnessType> {
        return {
            currentGeneration: this.currentGeneration,
            highestScore: scores.at(0)?.score,
            lowestScore: scores.at(-1)?.score,
            agentsWithScores: scores,
        };
    }

    /**
     * @description Sorts the agents by score.
     * @param scores The scores of the agents.
     * @returns The sorted agents with an appended score field.
     * */
    protected sortByScore(scores: FitnessType[]): AgentWithScore<ChromosomeType, FitnessType>[] {
        const agents = this.population.map((agent, index) => ({ agent, score: scores.at(index) }));
        return this.properties.sortFunction(agents);
    }

    /**
     * @description Gets the parents of the selected agents.
     * @param agents The selected agents.
     * @returns A generator of pairs of parents.
     * */
    protected *getParents(agents: Agent<ChromosomeType, FitnessType>[]): AgentParents<ChromosomeType, FitnessType> {
        // randomize the order of the agents
        const shuffledAgents = shuffle(agents);
        // for each pair of agents, append the pair to the parents array
        for (let i = 0; i < shuffledAgents.length; i += 2) {
            yield [shuffledAgents.at(i % shuffledAgents.length), shuffledAgents.at((i + 1) % shuffledAgents.length)];
        }
    }

    /**
     * @description Generates the children of the selected agents.
     * @param parents The generator of the selected agents.
     * @returns The children of the selected agents.
     * */
    protected generateChildren(parents: AgentParents<ChromosomeType, FitnessType>): Agent<ChromosomeType, FitnessType>[] {
        const children = [];
        for (const couple of parents) {
            const [parent1, parent2] = couple;
            const child = Agent.crossover(
                parent1,
                parent2,
                this.properties.splitFunction,
                this.properties.mixFunction,
                this.properties.mutationFunction,
                this.properties.agentGenerator,
            );
            children.push(child);
        }
        return children;
    }

    /**
     * @description Runs the simulation.
     * @param stopCondition Defines when the simulation must stop. If not specified, the simulation will run indefinitely.
     * @param fromStart If true, the simulation will generate the initial population and start from the first generation.
     * @returns The final population of agents.
     * */
    public async run(
        stopCondition: StopCondition<ChromosomeType, FitnessType> = () => false,
        fromStart = true,
    ): Promise<SimulationStats<ChromosomeType, FitnessType>> {
        if (fromStart) {
            this.population = this.properties.agentGenerator.createInitialPopulation();
            this.currentGeneration = 0;
        }
        let stats: SimulationStats<ChromosomeType, FitnessType>;
        do {
            const scores = await this.computeScores();
            const agentWithScores = this.sortByScore(scores);
            const selectedAgents = this.properties.selectionFunction(agentWithScores);
            const parents = this.getParents(selectedAgents);
            const children = this.generateChildren(parents);
            this.population = this.properties.agentGenerator.createPopulation(
                this.population,
                selectedAgents,
                children,
                ++this.currentGeneration,
            );
            stats = this.computeStats(agentWithScores);
        } while (!stopCondition(this.population, stats));
        return stats;
    }
}
