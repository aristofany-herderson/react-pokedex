import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";

type PokemonStrengthByAbility = {
  [ability: string]: PokemonPossibleTypes;
};

export const POKEMONSTRENGTHBYABILITY: PokemonStrengthByAbility = {
  levitate: "ground",
  "volt-absorb": "electric",
  "water-absorb": "water",
  "flash-fire": "fire",
};
