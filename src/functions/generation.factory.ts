import { DefaultFitnessType, DefaultGenType } from "../types";
import { Agent } from "../main/agent";

/**
 * @description Generates a new generation of agents.
 * @param currentPopulation The current population of agents ordered by fitness.
 * @param currentGeneration The current generation number.
 * @returns The new generation of agents.
 * */
export type GenerationFactory<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (currentPopulation: Agent<GenType, FitnessType>[], currentGeneration: number) => Agent<GenType, FitnessType>[];