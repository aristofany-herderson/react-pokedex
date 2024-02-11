export type Ability = {
  name: string;
  url: string;
};

export type PokemonsAbilities = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Ability[];
};
