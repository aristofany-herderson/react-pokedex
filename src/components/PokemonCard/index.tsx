import { baseImageUrl } from "@/services/api";
import { getPokemonByID } from "@/services/requests";
import Image from "next/image";
import styles from "./styles.module.scss";
import { PokemonTypeColors } from "@/utils/colors";
import { Suspense } from "react";

type PokemonCardProps = {
  id: number;
};

export const PokemonCard = async ({ id }: PokemonCardProps) => {
  const pokemonData = await getPokemonByID(id);
  const teste = await setTimeout(() => {return "ssas"},5000);
  const pokemonImage = `${baseImageUrl}${String(id).padStart(3, "0")}.png`;

  const backgroundColors = pokemonData.types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  console.log(teste)

  return (
      <div className={styles.card}>
        <div
          className={styles.figure}
          style={{
            background: backgroundColors[0].medium,
          }}
        >
          <Image
            width={130}
            height={130}
            src={pokemonImage}
            alt={pokemonData.name}
          />
        </div>
        <h2 className={styles.name}>{pokemonData.name}</h2>
        <div className={styles.types}>
          {pokemonData.types.map((type, key) => {
            const [[, backgroundColor]] = Object.entries(
              PokemonTypeColors
            ).filter(([key, _]) => key === type.type.name);
            return (
              <p
                style={{
                  color: backgroundColor.medium,
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
