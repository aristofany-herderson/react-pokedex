"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { POKEMONTYPECOLORS } from "@/utils/pokemons";
import { baseImageUrl } from "@/services/api";
import { PokemonType } from "@/@types/pokemon";
import { toBase64 } from "@/utils/to-base-64";
import { pokemonImageLoader } from "@/utils/pokemon-image-loader";
import { usePokemonQueryParams } from "@/hooks/usePokemonQueryParams";

type PokemonCardProps = {
  id: number;
  name: string;
  types: PokemonType[];
};

export const PokemonCard = ({
  id: pokemonId,
  name,
  types,
}: PokemonCardProps) => {
  const id = String(pokemonId).padStart(3, "0");
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
            placeholder={`data:image/svg+xml;base64,${toBase64(
              pokemonImageLoader(50, 50)
            )}`}
            src={`${baseImageUrl}${id}.png`}
            alt={`${name} pokemon image`}
          />
        </div>
        <span className={styles.id}>nº {id}</span>
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
