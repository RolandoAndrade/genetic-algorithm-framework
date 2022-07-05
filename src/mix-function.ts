/**
 * @description Defines the mix function.
 *
 * The mix function receives the splits of the genes of two chromosomes and returns the mixed genes.
 * */
export type MixFunction<GenType = number[][]> = (genesA: GenType[], genesB: GenType[]) => GenType;