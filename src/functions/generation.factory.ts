import { DefaultFitnessType, DefaultGenesType } from "@/types";
import { Agent } from "@/main";

/**
 * @description Generates a new generation of agents.
 * @param currentPopulation The current population of agents ordered by fitness.
 * @param currentGeneration The current generation number.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @returns The new generation of agents.
 * */
export type GenerationFactory<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> = (
    currentPopulation: Agent<ChromosomeType, FitnessType>[],
    currentGeneration: number,
) => Agent<ChromosomeType, FitnessType>[];
