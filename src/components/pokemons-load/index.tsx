"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/requests";
import { PokemonCard } from "../pokemon-card";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { AsyncReturnType } from "@/@types/async-return-type";
import { getLoadPokemonData } from "@/services/requests";
import { PosibleTypes as PokemonPosibleTypes } from "@/@types/pokemon";
import { SELECTPOKEMONHEIGHTS, SELECTPOKEMONWEIGHTS } from "@/utils/pokemons";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemonsData] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);

  const { search, from, to, type, weakness, ability, weight, height } =
    usePokemonQueryParams();

  useEffect(() => {
    if (inView) {
      fetchPokemons(pagination).then((response) => {
        setPokemonsData([...pokemons, ...response]);
        setPagination(pagination + 1);
      });
    }
  }, [pokemons, inView, pagination]);

  return (
    <>
      <section className={styles.pokemons}>
        {pokemons
          .filter((pokemon) => {
            if (search?.trim() == "" || search == null) {
              return pokemon;
            } else if (
              pokemon.name.toLowerCase().includes(search?.toLowerCase())
            ) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const fromVerification =
              from != null ? pokemon.id >= from : pokemon.id >= 0;
            const toVerification =
              to != null ? pokemon.id <= to : pokemon.id <= MAXPOKEMONSRENDERED;

            if (fromVerification && toVerification) {
              return pokemon;
            }

            if (from == null && to == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const types = pokemon.types.map((type) => type.type.name);
            const currentType = type?.split(",") as PokemonPosibleTypes[];
            const typeExists = currentType?.every((type) =>
              types?.includes(type)
            );

            if (currentType?.length > 0 && typeExists) {
              return pokemon;
            }

            if (currentType == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const weaknesses = pokemon.weakness;
            const currentWeakness = weakness?.split(
              ","
            ) as PokemonPosibleTypes[];
            const weaknessExists = currentWeakness?.every((type) =>
              weaknesses?.includes(type)
            );

            if (currentWeakness?.length > 0 && weaknessExists) {
              return pokemon;
            }

            if (currentWeakness == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const abilityList = pokemon.abilities.map((ability) =>
              ability.ability.name.toLowerCase()
            );
            const currentAbility = ability as string;

            if (
              ability != null &&
              abilityList.includes(currentAbility.toLowerCase())
            ) {
              return pokemon;
            }

            if (ability == null || ability == undefined) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const currentWeight = weight;
            const pokemonHeight = pokemon.weight / 10;

            const minVerification =
              currentWeight != null &&
              pokemonHeight >
                SELECTPOKEMONWEIGHTS[currentWeight - 1]?.range?.min;

            const maxVerification =
              currentWeight != null &&
              pokemonHeight <=
                SELECTPOKEMONWEIGHTS[currentWeight - 1]?.range?.max;

            if (minVerification && maxVerification) {
              return pokemon;
            }

            if (currentWeight == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const currentHeight = height;
            const pokemonHeight = pokemon.height / 10;

            const minVerification =
              currentHeight != null &&
              pokemonHeight >
                SELECTPOKEMONHEIGHTS[currentHeight - 1]?.range?.min;

            const maxVerification =
              currentHeight != null &&
              pokemonHeight <=
                SELECTPOKEMONHEIGHTS[currentHeight - 1]?.range?.max;

            if (minVerification && maxVerification) {
              return pokemon;
            }

            if (currentHeight == null) {
              return pokemon;
            }
          })
          .map((pokemon, key) => {
            return <PokemonCard key={key} {...pokemon} />;
          })}
      </section>
      {MAXPOKEMONSRENDERED + POKEMONSPERPAGE > POKEMONSPERPAGE * pagination && (
        <div ref={loadingRef} className={styles.loader}>
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
      )}
    </>
  );
};
