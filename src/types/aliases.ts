import { Chromosome } from "@/main";
/** Default gen type used by the agents */
export type DefaultGenType = number[];

/** Default fitness type used by the agents */
export type DefaultFitnessType = number;

/** Group of chromosomes */
export type Genome<GenType> = Chromosome<GenType>[];