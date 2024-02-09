type PokemonSpecieDetails = {
  pokemon_species: {
    name: string;
    url: string;
  };
  rate: number;
};

export type PokemonsGender = {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpecieDetails[];
  required_for_evolution: any[];
};
