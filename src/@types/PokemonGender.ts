type PokemonsSpecieDetails = {
  pokemon_species: {
    name: string;
    url: string;
  };
  rate: number;
};

export type PokemonGender = {
  pokemon_species_details: PokemonsSpecieDetails[];
};
