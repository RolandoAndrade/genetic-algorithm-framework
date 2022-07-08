import { Chromosome } from "../main/chromosome";
import { DefaultGenType } from "../types";

/**
 * @description Defines the split function.
 *
 * The split functions receives two chromosomes and returns a tuple of array of genes. The first array is the
 * split of the first chromosome and the second array is the split of the second chromosome.
 *
 * @param chromosomeA The first chromosome to split.
 * @param chromosomeB The second chromosome to split.
 * */
export type SplitFunction<GenType = DefaultGenType> = (chromosomeA: Chromosome<GenType>, chromosomeB: Chromosome<GenType>) => [GenType[], GenType[]];