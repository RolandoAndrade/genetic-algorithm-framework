import { DefaultGenesType } from "@/types";

/**
 * @description Defines the mutation function.
 *
 * The mutation function changes the genes.
 *
 * @param genes The genes to mutate.
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * @returns The mutated genes.
 * */
export type MutationFunction<ChromosomeType = DefaultGenesType> = (genes: ChromosomeType) => ChromosomeType;
