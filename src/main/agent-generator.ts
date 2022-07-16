import { DefaultFitnessType, DefaultGenesType, Genome } from "@/types";
import { Agent } from "@/main/agent";

/**
 * @description Creates new agents.
 *
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @typeParam FitnessType The type of the fitness score.
 * */
export abstract class AgentGenerator<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> {
    /**
     * @description Creates a new agent with random genes.
     * */
    public abstract createRandomAgent(): Agent<ChromosomeType, FitnessType>;

    /**
     * @description Creates a new agent from its genome.
     * */
    public abstract createAgentFromGenome(genome: Genome<ChromosomeType>): Agent<ChromosomeType, FitnessType>;

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
        currentPopulation: Agent<ChromosomeType, FitnessType>[],
        survivors: Agent<ChromosomeType, FitnessType>[],
        children: Agent<ChromosomeType, FitnessType>[],
        nextGeneration: number,
    ): Agent<ChromosomeType, FitnessType>[] {
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
    public abstract createInitialPopulation(): Agent<ChromosomeType, FitnessType>[];
}
