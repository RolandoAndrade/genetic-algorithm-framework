import { DefaultFitnessType, DefaultGenType, AgentWithScore } from "../types";

/**
 * @description Sorts agents by score.
 * @param agents The agents to sort with an appended score field.
 * @returns The sorted agents.
 * */
export type SortFunction<GenType = DefaultGenType, FitnessType = DefaultFitnessType> =
    (agents: AgentWithScore<GenType, FitnessType>[]) => AgentWithScore<GenType, FitnessType>[];