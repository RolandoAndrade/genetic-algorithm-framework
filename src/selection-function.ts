import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { AgentWithScore } from "./sort-function";
import { Agent } from "./agent";

/**
 * @description Selects a group of agents from a population by a given score.
 * @param population The population of agents.
 * @returns The selected agents.
 * */
export type SelectionFunction<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (population: AgentWithScore<GenType, FitnessType>[]) => Agent<GenType, FitnessType>[];