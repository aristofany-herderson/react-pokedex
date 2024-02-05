"use client";
import { getPokemonByID } from "@/services/clientRequests";
import Image from "next/image";
import styles from "./styles.module.scss";
import { PokemonTypeColors } from "@/utils/colors";
import { baseImageUrl } from "@/services/api";
import { PokemonType } from "@/@types/PokemonType";

export const PokemonCard = ({ id, name, types }: PokemonType) => {
  const paddedID = String(id).padStart(3, "0");

  return (
    <div className={styles.card}>
      <div className={styles.figure}>
        <Image
          width={50}
          height={50}
          src={`${baseImageUrl}${paddedID}.png`}
          alt={name}
        />
      </div>
      <span className={styles.id}>nº {paddedID}</span>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.types}>
        {types.map((type, key) => {
          const [[, backgroundColor]] = Object.entries(
            PokemonTypeColors
          ).filter(([key, _]) => key === type.type.name);

          return (
            <p
              style={{
                color: backgroundColor.medium,
                background: backgroundColor.light,
              }}
              key={key}
            >
              {type.type.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};
