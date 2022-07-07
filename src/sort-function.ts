import { Agent } from "./agent";
import { DefaultFitnessType, DefaultGenType } from "./aliases";

export type AgentWithScore<GenType, FitnessType> = { agent: Agent<GenType, FitnessType>, score: FitnessType };

/**
 * @description Sorts agents by score.
 * @param agents The agents to sort with an appended score field.
 * @returns The sorted agents.
 * */
export type SortFunction<GenType = DefaultGenType, FitnessType = DefaultFitnessType> =
    (agents: AgentWithScore<GenType, FitnessType>[]) => AgentWithScore<GenType, FitnessType>[];