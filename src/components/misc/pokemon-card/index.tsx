"use client";
import { Type as PokemonType } from "@/@types/pokemon";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { padId } from "@/utils/pad-id";
import { pokemonImagePlaceholder } from "@/utils/pokemon-image-placeholder";
import { pokemonImageURL } from "@/utils/pokemon-image-url";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import Image from "next/image";
import styles from "./styles.module.scss";

type PokemonCardProps = {
  id: number;
  name: string;
  types: PokemonType[];
};

export const PokemonCard = ({ id, name, types }: PokemonCardProps) => {
  const paddedID = padId(id);
  const { setPokemon: setSelectedPokemon } = usePokemonQueryParams();

  const handleClick = async () => {
    setSelectedPokemon(id);
  };

  return (
    <button type="button" onClick={handleClick} className={styles.card}>
      <div className={styles.cardWrapper}>
        <div className={styles.figure}>
          <Image
            width={50}
            height={50}
            placeholder={pokemonImagePlaceholder(40, 40)}
            src={pokemonImageURL(id)}
            alt={`${name} pokemon image`}
          />
        </div>
        <span className={styles.id}>nº {paddedID}</span>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.types}>
          {types.map(({ type }, key) => {
            const colors = POKEMONTYPECOLORS[type.name];

            return (
              <p
                style={{
                  ["--colors-color" as any]: colors.medium,
                  ["--colors-background" as any]: colors.light,
                }}
                key={key}
              >
                {type.name}
              </p>
            );
          })}
        </div>
      </div>
    </button>
  );
};
