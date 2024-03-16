import { PossibleTypes as PokemonPossibleTypes } from "./pokemon";

type DamageRelation = {
  name: PokemonPossibleTypes;
  url: string;
};

type DamageRelations = {
  double_damage_from: DamageRelation[];
  double_damage_to: DamageRelation[];
  half_damage_from: DamageRelation[];
  half_damage_to: DamageRelation[];
  no_damage_from: DamageRelation[];
  no_damage_to: DamageRelation[];
};

export type PokemonTypes = {
  damage_relations: DamageRelations;
  game_indices: any[];
  generation: any[];
  id: number;
  move_damage_class: any[];
  moves: any[];
  name: string;
  names: any[];
  past_damage_relations: any[];
  pokemon: any[];
};
