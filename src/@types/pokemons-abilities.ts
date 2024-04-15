type FlavorTextEntries = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
};

export type PokemonsAbility = {
  flavor_text_entries: FlavorTextEntries[];
};
