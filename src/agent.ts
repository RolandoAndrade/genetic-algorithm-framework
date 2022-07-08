import { Chromosome } from "./chromosome";
import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { SplitFunction } from "./split-function";
import { MixFunction } from "./mix-function";
import { MutationFunction } from "./mutation-function";

/**
 * @description Agent class.
 *
 * An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes and compute
 * a fitness value that is used during the selection and crossover process.
 * */
export abstract class Agent<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {

    public abstract get genome(): Chromosome<GenType>[];

    /**
     * @description Creates a new agent.
     * @param splitFunction The function used to split the genomes.
     * @param mixFunction The function used to mix the genomes.
     * @param mutationFunction The function used to mutate the genomes.
     * */
    protected constructor(public readonly splitFunction: SplitFunction<GenType>,
                          public readonly mixFunction: MixFunction<GenType>,
                          public readonly mutationFunction: MutationFunction<GenType>) {
    }

    /**
     * Generates a child agent from two agents.
     * @param agentA The first agent.
     * @param agentB The second agent.
     * @returns The child agent.
     * */
    public static crossover<GenType = DefaultGenType, FitnessType = DefaultFitnessType>(agentA: Agent<GenType, FitnessType>,
                                                                                        agentB: Agent<GenType, FitnessType>): Agent<GenType, FitnessType> {
        const childGenome = agentA.genome.map((chromosome, index) => {
            const otherChromosome = agentB.genome[index];
            return Chromosome.crossover(chromosome, otherChromosome, agentA.splitFunction, agentA.mixFunction, agentA.mutationFunction);
        });
        return Agent.fromGenome(childGenome);
    }

    /**
     * @description Gets the fitness value of the agent.
     * @returns The fitness value of the agent.
     * */
    public abstract getScore(): Promise<FitnessType>;

    /**
     * @description Generates a new agent from its genome.
     * @param genome The genome of the agent.
     * @returns The new agent.
     * @throws An error if it is not implemented in the derived class.
     * */
    public static fromGenome(genome: Chromosome<any>[]): Agent<any, any> {
        throw new Error("Not implemented. Create a static fromGenome method in the derived class.");
    }
}