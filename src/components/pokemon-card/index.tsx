"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { POKEMONTYPECOLORS } from "@/utils/pokemons";
import { Type as PokemonType } from "@/@types/pokemon";
import { pokemonSVGLoader } from "@/utils/pokemon-image-loader";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { pokemonImageURL } from "@/utils/pokemon-image-url";

type PokemonCardProps = {
  id: number;
  name: string;
  types: PokemonType[];
};

export const PokemonCard = ({
  id,
  name,
  types,
}: PokemonCardProps) => {
  const paddedID = id.toString().padStart(3, "0");
  const { setPokemon } = usePokemonQueryParams();

  return (
    <button
      type="button"
      onClick={() => setPokemon(name)}
      className={styles.card}
    >
      <div className={styles.cardWrapper}>
        <div className={styles.figure}>
          <Image
            width={50}
            height={50}
            placeholder={pokemonSVGLoader(40, 40)}
            src={pokemonImageURL(id)}
            alt={`${name} pokemon image`}
          />
        </div>
        <span className={styles.id}>nº {paddedID}</span>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.types}>
          {types.map((type, key) => {
            const colors = (POKEMONTYPECOLORS as any)[type.type.name];

            return (
              <p
                style={{
                  color: colors.medium,
                  background: colors.light,
                }}
                key={key}
              >
                {type.type.name}
              </p>
            );
          })}
        </div>
      </div>
    </button>
  );
};
