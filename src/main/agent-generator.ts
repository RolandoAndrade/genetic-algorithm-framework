import { DefaultFitnessType, DefaultGenType } from "@/types";
import { Agent } from "@/main/agent";
import { Chromosome } from "@/main/chromosome";

/**
 * @description Creates new agents.
 * */
export abstract class AgentGenerator<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {
    /**
     * @description Creates a new agent with random genes.
     * */
    public abstract createRandomAgent(): Agent<GenType, FitnessType>;

    /**
     * @description Creates a new agent from its genome.
     * */
    public abstract createAgentFromGenome(genome: Chromosome<GenType>[]): Agent<GenType, FitnessType>;

    /**
     * @description Creates a new group of agents.
     *
     * The default behaviour is merging the survivors, children and a group of random agents until the size of the current
     * population is reached.
     *
     * This method can be overridden to create a different behaviour.
     *
     * @param currentPopulation The current population of agents ordered by fitness.
     * @param survivors The survivors of the current generation.
     * @param children The children generated in the current generation.
     * @param nextGeneration The next generation number.
     * @returns The new population of agents.
     * */
    public createPopulation(
        currentPopulation: Agent<GenType, FitnessType>[],
        survivors: Agent<GenType, FitnessType>[],
        children: Agent<GenType, FitnessType>[],
        nextGeneration: number,
    ): Agent<GenType, FitnessType>[] {
        const populationSize = currentPopulation.length;
        const newPopulation = [...survivors, ...children];
        while (newPopulation.length < populationSize) {
            newPopulation.push(this.createRandomAgent());
        }
        return newPopulation.slice(0, populationSize);
    }

    /**
     * @description Creates a random initial population of agents.
     * */
    public abstract createInitialPopulation(): Agent<GenType, FitnessType>[];
}
