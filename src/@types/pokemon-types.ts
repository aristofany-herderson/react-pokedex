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
  id: number;
  name: string;
  damage_relations: DamageRelations;
};
