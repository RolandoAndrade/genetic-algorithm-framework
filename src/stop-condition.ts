import { DefaultFitnessType, DefaultGenType } from "./aliases";
import { Agent } from "./agent";
import { SimulationStats } from "./simulation-stats";

export type StopCondition<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (currentPopulation: Agent<GenType, FitnessType>[], stats: SimulationStats<FitnessType>) => boolean;