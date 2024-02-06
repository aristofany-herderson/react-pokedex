type PokemonsFlavorTextEntries = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

export type PokemonSpecieType = {
  flavor_text_entries: PokemonsFlavorTextEntries[];
};
