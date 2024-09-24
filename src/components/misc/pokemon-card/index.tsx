"use client";
import { Type as PokemonType } from "@/@types/pokemon";
import { useApp } from "@/contexts/app-context";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { padId } from "@/utils/pad-id";
import { pokemonImagePlaceholder } from "@/utils/pokemon-image-placeholder";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import Image from "next/image";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

type PokemonCardProps = {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
};

type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  data: PokemonCardProps;
};

export const PokemonCard = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ data: { id, name, sprite, types }, ...props }, forwardedRef) => {
    const { setOrToggleIsAsideOpen } = useApp();
    const { setPokemon: setSelectedPokemon } = usePokemonQueryParams();

    const paddedID = padId(id);

    const handleClick = () => {
      setSelectedPokemon(id);
      setOrToggleIsAsideOpen(true);
    };

    return (
      <button
        type="button"
        onClick={handleClick}
        className={styles.card}
        {...props}
      >
        <div className={styles.cardWrapper}>
          <div className={styles.figure}>
            <Image
              width={50}
              height={50}
              placeholder={pokemonImagePlaceholder(40, 40)}
              src={sprite}
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
  }
);

PokemonCard.displayName = "PokemonCard";
