import { AgentWithScore, DefaultFitnessType, DefaultGenesType } from "../types";
import { Agent } from "../main/agent";

/**
 * @description Selects a group of agents from a population by a given score.
 * @param population The population of agents.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @typeParam FitnessType The type of the fitness score.
 * @returns The selected agents.
 * */
export type SelectionFunction<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> = (
    population: AgentWithScore<ChromosomeType, FitnessType>[],
) => Agent<ChromosomeType, FitnessType>[];
