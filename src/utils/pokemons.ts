import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";

export const POKEMONTYPECOLORS = {
  normal: {
    light: "#CDCDB9",
    medium: "#7E7E67",
  },
  fire: {
    light: "#F4934D",
    medium: "#A8512B",
  },
  fighting: {
    light: "#DA736E",
    medium: "#802020",
  },
  water: {
    light: "#85A5F0",
    medium: "#33508A",
  },
  flying: {
    light: "#B8A5F2",
    medium: "#584E82",
  },
  grass: {
    light: "#99D07D",
    medium: "#3D6021",
  },
  poison: {
    light: "#BE588B",
    medium: "#602040",
  },
  electric: {
    light: "#F9DF78",
    medium: "#B88C20",
  },
  ground: {
    light: "#EDD081",
    medium: "#967A2A",
  },
  psychic: {
    light: "#F47DA1",
    medium: "#A8285F",
  },
  rock: {
    light: "#C5B059",
    medium: "#6D5C1F",
  },
  ice: {
    light: "#B3E1E1",
    medium: "#589595",
  },
  bug: {
    light: "#B5C534",
    medium: "#577415",
  },
  dragon: {
    light: "#966AFD",
    medium: "#4A3086",
  },
  ghost: {
    light: "#917fAF",
    medium: "#403A54",
  },
  dark: {
    light: "#968376",
    medium: "#403A31",
  },
  steel: {
    light: "#C1C1D1",
    medium: "#787882",
  },
  fairy: {
    light: "#EFA7B7",
    medium: "#B0708E",
  },
};

export const POKEMONSTATCOLORS = {
  hp: {
    name: "hp",
    color: "#df2140",
  },
  attack: {
    name: "atk",
    color: "#ff994d",
  },
  defense: {
    name: "def",
    color: "#fedc61",
  },
  "special-attack": {
    name: "spA",
    color: "#85ddff",
  },
  "special-defense": {
    name: "spD",
    color: "#a8ef95",
  },
  speed: {
    name: "spd",
    color: "#fb94a8",
  },
};

export const POKEMONFILTERLEVELCOLORS = {
  1: "#FF6B6B",
  2: "#FF8A65",
  3: "#FFB74D",
  4: "#FFD54F",
  5: "#4CAF50",
};

type PokemonStrengthByAbility = {
  [ability: string]: PokemonPossibleTypes;
};

export const POKEMONSTRENGTHBYABILITY: PokemonStrengthByAbility = {
  levitate: "ground",
  "volt-absorb": "electric",
  "water-absorb": "water",
  "flash-fire": "fire",
};
