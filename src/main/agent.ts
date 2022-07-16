import { DefaultFitnessType, DefaultGenesType, Genome } from "@/types";
import { SplitFunction, MixFunction, MutationFunction } from "@/functions";
import { AgentGenerator } from "@/main/agent-generator";

/**
 * @description An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes and compute
 * a fitness value that is used during the selection and crossover process.
 *
 * @typeParam ChromosomeType Type of the group (array, tensor, set, etc.) of genes. The genome will be a group of this type. By default, it is an array of numbers.
 * @typeParam FitnessType The type of the returned score of the agent. By default, it is a number.
 * */
export abstract class Agent<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> {
    /** Group of chromosomes that forms the agent */
    public abstract get genome(): Genome<ChromosomeType>;

    /**
     * Generates a child agent from two agents.
     * @param agentA The first agent.
     * @param agentB The second agent.
     * @param splitFunction The function used to split the genomes.
     * @param mixFunction The function used to mix the genomes.
     * @param mutationFunction The function used to mutate the genomes.
     * @param agentGenerator The agent generator used to generate the child agent.
     * @returns The child agent.
     * */
    public static crossover<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType>(
        agentA: Agent<ChromosomeType, FitnessType>,
        agentB: Agent<ChromosomeType, FitnessType>,
        splitFunction: SplitFunction<ChromosomeType>,
        mixFunction: MixFunction<ChromosomeType>,
        mutationFunction: MutationFunction<ChromosomeType>,
        agentGenerator: AgentGenerator<ChromosomeType, FitnessType>,
    ): Agent<ChromosomeType, FitnessType> {
        const childGenome = agentA.genome.map((chromosomeA, index) => {
            const chromosomeB = agentB.genome[index];
            const [chromosomeASplits, chromosomeBSplits] = splitFunction(chromosomeA, chromosomeB);
            const newGenes = mixFunction(chromosomeASplits, chromosomeBSplits);
            const mutatedGenes = mutationFunction(newGenes);
            return mutatedGenes;
        });
        return agentGenerator.createAgentFromGenome(childGenome);
    }

    /**
     * @description Gets the fitness value of the agent.
     * @returns The fitness value of the agent.
     * */
    public abstract getScore(): Promise<FitnessType>;
}
