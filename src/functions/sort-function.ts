import { DefaultFitnessType, DefaultGenesType, AgentWithScore } from "@/types";

/**
 * @description Sorts agents by score.
 * @param agents The agents to sort with an appended score field.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @typeParam FitnessType The type of the fitness score.
 * @returns The sorted agents.
 * */
export type SortFunction<ChromosomeType = DefaultGenesType, FitnessType = DefaultFitnessType> = (
    agents: AgentWithScore<ChromosomeType, FitnessType>[],
) => AgentWithScore<ChromosomeType, FitnessType>[];
