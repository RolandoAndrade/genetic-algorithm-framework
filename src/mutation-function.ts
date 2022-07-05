/**
 * @description Defines the mutation function.
 *
 * The mutation function changes the genes.
 * */
export type MutationFunction<GenType = number[][]> = (genes: GenType) => GenType;