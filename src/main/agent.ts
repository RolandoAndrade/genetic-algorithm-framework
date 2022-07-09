import { Chromosome } from "./chromosome";
import { DefaultFitnessType, DefaultGenType } from "../types";
import { SplitFunction, MixFunction, MutationFunction } from "../functions";
import { AgentGenerator } from "@/main/agent-generator";

/**
 * @description Agent class.
 *
 * An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes and compute
 * a fitness value that is used during the selection and crossover process.
 * */
export abstract class Agent<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {

    public abstract get genome(): Chromosome<GenType>[];

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
    public static crossover<GenType = DefaultGenType, FitnessType = DefaultFitnessType>(agentA: Agent<GenType, FitnessType>,
                                                                                        agentB: Agent<GenType, FitnessType>,
                                                                                        splitFunction: SplitFunction<GenType>,
                                                                                        mixFunction: MixFunction<GenType>,
                                                                                        mutationFunction: MutationFunction<GenType>,
                                                                                        agentGenerator: AgentGenerator<GenType, FitnessType>): Agent<GenType, FitnessType> {
        const childGenome = agentA.genome.map((chromosome, index) => {
            const otherChromosome = agentB.genome[index];
            return Chromosome.crossover(chromosome, otherChromosome, splitFunction, mixFunction, mutationFunction);
        });
        return agentGenerator.createAgentFromGenome(childGenome);
    }

    /**
     * @description Gets the fitness value of the agent.
     * @returns The fitness value of the agent.
     * */
    public abstract getScore(): Promise<FitnessType>;
}