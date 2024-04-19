export type SelectionPokemonRange = {
  value: 1 | 2 | 3 | 4 | 5;
  label: string;
  range: {
    min: number;
    max: number;
  };
};
