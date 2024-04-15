type PokemonSpeciesDetails = {
  pokemon_species: {
    name: string;
    url: string;
  };
  rate: number;
};

export type PokemonsGender = {
  id: number;
  name: string;
  pokemon_species_details: PokemonSpeciesDetails[];
};
