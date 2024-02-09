"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { POKEMONTYPECOLORS } from "@/utils/pokemons";
import { baseImageUrl } from "@/services/api";
import { PokemonProps } from "@/@types/PokemonProps";
import { useQueryState } from "nuqs";

export const PokemonCard = ({ id, name, types }: PokemonProps) => {
  const paddedID = String(id).padStart(3, "0");
  const [_, setPokemon] = useQueryState("pokemon");

  return (
    <button onClick={() => setPokemon(name)} className={styles.card}>
      <div className={styles.figure}>
        <Image
          width={50}
          height={50}
          src={
            id != undefined
              ? `${baseImageUrl}${paddedID}.png`
              : "/icons/pokebal.svg"
          }
          alt={name}
        />
      </div>
      <span className={styles.id}>nº {paddedID}</span>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.types}>
        {types.map((type, key) => {
          const [[, colors]] = Object.entries(POKEMONTYPECOLORS).filter(
            ([key, _]) => key === type.type.name
          );

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
    </button>
  );
};
