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
  effect_changes: any[];
  effect_entries: any[];
  flavor_text_entries: FlavorTextEntries[];
};
