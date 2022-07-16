import { DefaultFitnessType, DefaultGenType, SimulationStats } from "@/types";
import { Agent } from "@/main";

export type StopCondition<GenType = DefaultGenType, FitnessType = DefaultFitnessType> = (currentPopulation: Agent<GenType, FitnessType>[], stats: SimulationStats<GenType, FitnessType>) => boolean;