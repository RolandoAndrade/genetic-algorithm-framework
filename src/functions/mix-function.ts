import { DefaultGenesType } from "@/types";

/**
 * @description Defines the mix function.
 *
 * The mix function receives the splits of the genes of two chromosomes and returns the mixed genes.
 *
 * @param genesA The first split of the genes.
 * @param genesB The second split of the genes.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @returns The mixed genes.
 * */
export type MixFunction<ChromosomeType = DefaultGenesType> = (genesA: ChromosomeType[], genesB: ChromosomeType[]) => ChromosomeType;
