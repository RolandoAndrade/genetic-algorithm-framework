import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { Agent } from "./agent";

/**
 * @description Generates a new generation of agents.
 * @param currentPopulation The current population of agents ordered by fitness.
 * @param currentGeneration The current generation number.
 * @returns The new generation of agents.
 * */
export type GenerationFactory<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (currentPopulation: Agent[], currentGeneration: number) => Agent[];