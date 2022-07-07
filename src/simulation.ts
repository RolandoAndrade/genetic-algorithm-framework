import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { SimulationOptions } from "./simulation-options";
import { StopCondition } from "./stop-condition";
import { Agent } from "./agent";
import { SimulationStats } from "./simulation-stats";
import { AgentWithScore } from "./sort-function";
import { shuffle } from "./utils";
import { Chromosome } from "./chromosome";

type AgentParents<GenType, FitnessType> = [Agent<GenType, FitnessType>, Agent<GenType, FitnessType>][];

export class Simulation<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {
    /** Population of the simulation */
    protected population: Agent<GenType, FitnessType>[] = [];
    /** Defines the current generation of the simulation */
    protected readonly currentGeneration = 0;

    /**
     * @param options The simulation options.
     * */
    constructor(protected readonly options: SimulationOptions<GenType, FitnessType>) {}

    protected async computeScores(): Promise<FitnessType[]> {
        const promises = this.population.map(agent => agent.getScore());
        return Promise.all(promises);
    }

    protected computeStats(scores: FitnessType[]): SimulationStats<FitnessType> {
        return {
            currentGeneration: this.currentGeneration,
            highestScore: scores.at(0),
            lowestScore: scores.at(-1),
            scores: scores
        }
    }

    protected sortByScore(scores: FitnessType[]): AgentWithScore<GenType, FitnessType>[] {
        const agents = this.population.map((agent, index) => ({ agent, score: scores.at(index) }));
        return this.options.sortFunction(agents);
    }


    protected getParents(agents: Agent<GenType, FitnessType>[]): AgentParents<GenType, FitnessType> {
        // randomize the order of the agents
        const shuffledAgents = shuffle(agents);
        const parents = [];
        // for each pair of agents, append the pair to the parents array
        for (let i = 0; i < shuffledAgents.length; i += 2) {
            parents.push([shuffledAgents.at(i % shuffledAgents.length), shuffledAgents.at((i + 1) % shuffledAgents.length)]);
        }
        return parents;
    }

    protected generateChildren(parents: AgentParents<GenType, FitnessType>): Agent<GenType, FitnessType>[] {
        for (const couple of parents) {
            const [ parent1, parent2 ] = couple;
        }
        return [];
    }

    /**
     * @description Runs the simulation.
     * @param stopCondition Defines when the simulation must stop. If not specified, the simulation will run indefinitely.
     * @returns The final population of agents.
     * */
    public async run(stopCondition: StopCondition<GenType, FitnessType> = () => true) {
        this.population = this.options.generationFactory(this.population, this.currentGeneration);
        let scores = [];
        do {
            scores = await this.computeScores();
            scores = this.sortByScore(scores);
            const selectedAgents = this.options.selectionFunction(scores);
            const parents = this.getParents(selectedAgents);

        } while (stopCondition(this.population, this.computeStats(scores.map(agent => agent.score))));
    }
}