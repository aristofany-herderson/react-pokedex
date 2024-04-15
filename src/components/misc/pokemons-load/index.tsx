"use client";
import { AsyncReturnType } from "@/@types/async-return-type";
import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { getLoadPokemonData, getPokemonsByPagination } from "@/services/requests";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONWEIGHTS,
} from "@/utils/selects-data";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonCard } from "../pokemon-card";
import styles from "./styles.module.scss";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemons] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);
  const { search, from, to, type, weakness, ability, weight, height, order } =
    usePokemonQueryParams();

  useEffect(() => {
    const DESCPokemons = () => {
      setPokemons((prevState) => prevState?.sort((a, b) => b.id - a.id));
    };
    const ASCPokemons = () => {
      setPokemons((prevState) => prevState?.sort((a, b) => a.id - b.id));
    };

    order?.toLowerCase() === "asc" && ASCPokemons();
    order?.toLowerCase() === "desc" && DESCPokemons();
  }, [order]);

  useEffect(() => {
    const getPokemons = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await getPokemonsByPagination(pagination);
        setPokemons((prevPokemons) => [...prevPokemons, ...response]);
        setPagination((prevState) => prevState + 1);
      } catch (error) {
        console.error("Failed to fetch pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      getPokemons();
    }
  }, [inView, pagination, loading, pokemons]);

  return (
    <>
      <section className={styles.pokemons}>
        {pokemons
          .filter((pokemon) => {
            if (!search?.trim() || search == null) {
              return true;
            } else if (
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            }

            return false;
          })
          .filter((pokemon) => {
            const fromVerification =
              from != null ? pokemon.id >= from : pokemon.id >= 0;
            const toVerification =
              to != null ? pokemon.id <= to : pokemon.id <= MAXPOKEMONSRENDERED;

            if (fromVerification && toVerification) {
              return true;
            }

            if (from == null && to == null) {
              return true;
            }

            return false;
          })
          .filter((pokemon) => {
            const types = pokemon.types.map((type) => type.type.name);
            const currentType = type?.split(",") as PokemonPossibleTypes[];
            const typeExists = currentType?.every((type) =>
              types?.includes(type)
            );

            if (currentType?.length > 0 && typeExists) {
              return true;
            }

            if (currentType == null) {
              return true;
            }

            return false;
          })
          .filter((pokemon) => {
            const weaknesses = pokemon.weakness;
            const currentWeakness = weakness?.split(
              ","
            ) as PokemonPossibleTypes[];
            const weaknessExists = currentWeakness?.every((type) =>
              weaknesses?.includes(type)
            );

            if (currentWeakness?.length > 0 && weaknessExists) {
              return true;
            }

            if (currentWeakness == null) {
              return true;
            }

            return false;
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
              return true;
            }

            if (ability == null || ability == undefined) {
              return true;
            }

            return false;
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
              return true;
            }

            if (currentWeight == null) {
              return true;
            }

            return false;
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
              return true;
            }

            if (currentHeight == null) {
              return true;
            }

            return false;
          })
          .map((pokemon, index) => {
            return <PokemonCard key={index} {...pokemon} />;
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
