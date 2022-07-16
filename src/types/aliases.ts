/** Default gene type used by the agents */
export type DefaultGenesType = number[];

/** Default fitness type used by the agents */
export type DefaultFitnessType = number;

/**
 * @description Group of chromosomes.
 *
 * @typeParam ChromosomeType The type of the group of genes that forms the genome.
 * */
export type Genome<ChromosomeType> = ChromosomeType[];
