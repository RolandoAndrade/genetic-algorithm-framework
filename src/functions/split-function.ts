import { DefaultGenesType } from "@/types";

/**
 * @description Defines the split function.
 *
 * The split functions receives two chromosomes and returns a tuple of array of genes. The first array is the
 * split of the first chromosome and the second array is the split of the second chromosome.
 *
 * @param chromosomeA The first chromosome to split.
 * @param chromosomeB The second chromosome to split.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @returns A tuple. The first element has an array with the split genes of the first chromosome and the second element
 * has an array with the split genes of the second chromosome.
 * */
export type SplitFunction<ChromosomeType = DefaultGenesType> = (
    chromosomeA: ChromosomeType,
    chromosomeB: ChromosomeType,
) => [ChromosomeType[], ChromosomeType[]];
