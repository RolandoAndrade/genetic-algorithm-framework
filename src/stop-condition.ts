import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { Agent } from "./agent";

export type StopCondition<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (currentPopulation: Agent<GenType, FitnessType>[], currentGeneration: number, highestScore: FitnessType) => boolean;