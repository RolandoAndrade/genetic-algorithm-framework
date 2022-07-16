import { DefaultGenType } from "../types";

/**
 * @description Defines the mix function.
 *
 * The mix function receives the splits of the genes of two chromosomes and returns the mixed genes.
 *
 * @param genesA The first split of the genes.
 * @param genesB The second split of the genes.
 * */
export type MixFunction<GenType = DefaultGenType> = (genesA: GenType[], genesB: GenType[]) => GenType;
