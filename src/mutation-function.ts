/**
 * @description Defines the mutation function.
 *
 * The mutation function changes the genes.
 *
 * @param genes The genes to mutate.
 * */
export type MutationFunction<GenType = number[][]> = (genes: GenType) => GenType;