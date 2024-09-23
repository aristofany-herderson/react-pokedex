export type PokemonsAbility = {
  effect_changes: EffectChange[];
  effect_entries: PokemonAbilitiesEffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: Pokemon[];
};

export type EffectChange = {
  effect_entries: EffectChangeEffectEntry[];
  version_group: Generation;
};

export type EffectChangeEffectEntry = {
  effect: string;
  language: Generation;
};

export type Generation = {
  name: string;
  url: string;
};

export type PokemonAbilitiesEffectEntry = {
  effect: string;
  language: Generation;
  short_effect: string;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: Generation;
  version_group: Generation;
};

export type Name = {
  language: Generation;
  name: string;
};

export type Pokemon = {
  is_hidden: boolean;
  pokemon: Generation;
  slot: number;
};
