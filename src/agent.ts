import { Chromosome } from "./chromosome";
import { DefaultFitnessType, DefaultGenType } from "./aliases";

/**
 * @description Agent class.
 *
 * An agent is a virtual entity that can be placed in a simulation. It contains a set of chromosomes and compute
 * a fitness value that is used during the selection and crossover process.
 * */
export abstract class Agent<GenType = DefaultGenType, FitnessType = DefaultFitnessType> {

    protected genome: Chromosome<GenType>[] = [];

    /**
     * @description Gets the fitness value of the agent.
     * @returns The fitness value of the agent.
     * */
    abstract getScore(): FitnessType;
}