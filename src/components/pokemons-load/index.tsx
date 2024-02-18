"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/server-requests";
import { PokemonCard } from "../pokemon-card";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { AsyncReturnType } from "@/@types/async-return-type";
import { getLoadPokemonData } from "@/services/client-requests";
import { PokemonPosibleTypes } from "@/@types/pokemon";
import { SELECTPOKEMONHEIGHTS, SELECTPOKEMONWEIGHTS } from "@/utils/pokemons";
import { usePokemonQueryParams } from "@/hooks/usePokemonQueryParams";

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
              from != null ? pokemon.id >= Number(from) : pokemon.id >= 0;
            const toVerification =
              to != null
                ? pokemon.id <= Number(to)
                : pokemon.id <= MAXPOKEMONSRENDERED;

            if (fromVerification && toVerification) {
              return pokemon;
            }

            if (from == null || to == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const types = pokemon.types.map((type) =>
              type.type.name.toLowerCase()
            );
            const currentType = type as PokemonPosibleTypes;

            if (type != null && types.includes(currentType.toLowerCase())) {
              return pokemon;
            }

            if (type == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const weaknesses = pokemon.weakness;
            const currentWeakness = weakness as PokemonPosibleTypes;

            if (weakness != null && weaknesses.includes(currentWeakness)) {
              return pokemon;
            }

            if (weakness == null) {
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
            const currentWeight = weight as unknown as number;
            const pokemonWeight = pokemon.weight / 10;

            const minVerification =
              currentWeight != null &&
              SELECTPOKEMONWEIGHTS[currentWeight]?.values?.min < pokemonWeight;

            const maxVerification =
              currentWeight != null &&
              SELECTPOKEMONWEIGHTS[currentWeight]?.values?.max >= pokemonWeight;
            if (minVerification && maxVerification) {
              return pokemon;
            }

            if (currentWeight == null) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const currentHeight = height as unknown as number;
            const pokemonHeight = pokemon.height / 10;

            const minVerification =
              currentHeight != null &&
              SELECTPOKEMONHEIGHTS[currentHeight]?.values?.min < pokemonHeight;

            const maxVerification =
              currentHeight != null &&
              SELECTPOKEMONHEIGHTS[currentHeight]?.values?.max >= pokemonHeight;
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
