import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { BugIcon } from "@/components/ui/icons/bug-icon";
import { DarkIcon } from "@/components/ui/icons/dark-icon";
import { DragonIcon } from "@/components/ui/icons/dragon-icon";
import { ElectricIcon } from "@/components/ui/icons/electric-icon";
import { FairyIcon } from "@/components/ui/icons/fairy-icon";
import { FightingIcon } from "@/components/ui/icons/fighting-icon";
import { FireIcon } from "@/components/ui/icons/fire-icon";
import { FlyingIcon } from "@/components/ui/icons/flying-icon";
import { GhostIcon } from "@/components/ui/icons/ghost-icon";
import { GrassIcon } from "@/components/ui/icons/grass-icon";
import { GroundIcon } from "@/components/ui/icons/ground-icon";
import { IceIcon } from "@/components/ui/icons/ice-icon";
import { NormalIcon } from "@/components/ui/icons/normal-icon";
import { PoisonIcon } from "@/components/ui/icons/poison-icon";
import { PsychicIcon } from "@/components/ui/icons/psychic-icon";
import { RockIcon } from "@/components/ui/icons/rock-icon";
import { SteelIcon } from "@/components/ui/icons/steel-icon";
import { WaterIcon } from "@/components/ui/icons/water-icon";
import { ReactNode } from "react";

type PokemonTypeIcons = {
  [key in PokemonPossibleTypes]: ReactNode;
};

export const POKEMONTYPEICONS: PokemonTypeIcons = {
  normal: <NormalIcon width={12} height={12} />,
  fire: <FireIcon width={12} height={12} />,
  fighting: <FightingIcon width={12} height={12} />,
  water: <WaterIcon width={12} height={12} />,
  flying: <FlyingIcon width={12} height={12} />,
  grass: <GrassIcon width={12} height={12} />,
  poison: <PoisonIcon width={12} height={12} />,
  electric: <ElectricIcon width={12} height={12} />,
  ground: <GroundIcon width={12} height={12} />,
  psychic: <PsychicIcon width={12} height={12} />,
  rock: <RockIcon width={12} height={12} />,
  ice: <IceIcon width={12} height={12} />,
  bug: <BugIcon width={12} height={12} />,
  dragon: <DragonIcon width={12} height={12} />,
  ghost: <GhostIcon width={12} height={12} />,
  dark: <DarkIcon width={12} height={12} />,
  steel: <SteelIcon width={12} height={12} />,
  fairy: <FairyIcon width={12} height={12} />,
};
