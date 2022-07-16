import { DefaultFitnessType, DefaultGenesType, SimulationStats } from "@/types";
import { Agent } from "@/main";

/**
 * @description Defines where the simulation must stop.
 *
 * @param currentGeneration The current population of the simulation.
 * @param stats Stats of the last generation.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @typeParam FitnessType The type of the fitness score.
 * @returns True if the simulation must stop, false otherwise.
 * */
export type StopCondition<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> = (
    currentPopulation: Agent<ChromosomeType, FitnessType>[],
    stats: SimulationStats<ChromosomeType, FitnessType>,
) => boolean;
