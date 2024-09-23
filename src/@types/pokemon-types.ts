import { PossibleTypes as PokemonPossibleTypes } from "./pokemon";

export type PokemonTypes = {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: Generation;
  id: number;
  move_damage_class: Generation;
  moves: Generation[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
};

export type DamageRelations = {
  double_damage_from: Generation[];
  double_damage_to: Generation[];
  half_damage_from: Generation[];
  half_damage_to: Generation[];
  no_damage_from: Generation[];
  no_damage_to: Generation[];
};

export type Generation = {
  name: PokemonPossibleTypes;
  url: string;
};

export type GameIndex = {
  game_index: number;
  generation: Generation;
};

export type Name = {
  language: Generation;
  name: string;
};

export type Pokemon = {
  pokemon: Generation;
  slot: number;
};
