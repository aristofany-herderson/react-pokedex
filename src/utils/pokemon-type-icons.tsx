import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import { ReactNode } from "react";

type PokemonTypeIcons = {
  [key in PokemonPossibleTypes]: ReactNode;
};

export const POKEMONTYPEICONS: PokemonTypeIcons = {
  normal: <GithubIcon />,
  fire: <GithubIcon />,
  fighting: <GithubIcon />,
  water: <GithubIcon />,
  flying: <GithubIcon />,
  grass: <GithubIcon />,
  poison: <GithubIcon />,
  electric: <GithubIcon />,
  ground: <GithubIcon />,
  psychic: <GithubIcon />,
  rock: <GithubIcon />,
  ice: <GithubIcon />,
  bug: <GithubIcon />,
  dragon: <GithubIcon />,
  ghost: <GithubIcon />,
  dark: <GithubIcon />,
  steel: <GithubIcon />,
  fairy: <GithubIcon />,
};