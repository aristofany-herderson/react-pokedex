"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/server-requests";
import { PokemonCard } from "../pokemon-card";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { useQueryState } from "nuqs";
import { Pokemon, PokemonPosibleTypes } from "@/@types/pokemon";
import { AsyncReturnType } from "@/@types/async-return-type";
import { getLoadPokemonData } from "@/services/client-requests";
import types from "next/types";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemonsData] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);
  const [from] = useQueryState("from");
  const [to] = useQueryState("to");
  const [type] = useQueryState("type");
  const [weakness] = useQueryState("weakness");
  const [generation] = useQueryState("generation");

  useEffect(() => {
    if (inView) {
      fetchPokemons(pagination).then((response) => {
        setPokemonsData([...pokemons, ...response]);
        setPagination(pagination + 1);
      });
    }
  }, [pokemons, inView]);

  return (
    <>
      <section className={styles.pokemons}>
        {pokemons
          .filter((pokemon) => {
            const fromVerification =
              from?.trim() != "" && from != null
                ? pokemon.id >= Number(from)
                : pokemon.id >= 0;
            const toVerification =
              to?.trim() != "" && to != null
                ? pokemon.id <= Number(to)
                : pokemon.id <= MAXPOKEMONSRENDERED;
            if (fromVerification && toVerification) {
              return pokemon;
            }

            if (
              from == "" ||
              from == null ||
              (from == undefined && to == "") ||
              to == null ||
              to == undefined
            ) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const types = pokemon.types.map((type) => type.type.name);
            const newType = type as PokemonPosibleTypes;

            if (type != null && types.includes(newType)) {
              return pokemon;
            }

            if (type == "" || type == null || type == undefined) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            const weaknessList = pokemon.weakness.map((weak) => weak);
            const newWeakness = weakness as PokemonPosibleTypes;

            if (weakness != null && weaknessList.includes(newWeakness)) {
              return pokemon;
            }

            if (weakness == "" || weakness == null || weakness == undefined) {
              return pokemon;
            }
          })
          .filter((pokemon) => {
            if (
              pokemon.generation != null &&
              pokemon.generation == Number(generation)
            ) {
              return pokemon;
            }

            if (
              generation == "" ||
              generation == null ||
              generation == undefined
            ) {
              return pokemon;
            }
          })
          .map((pokemon, key) => {
            return <PokemonCard key={key} {...pokemon} />;
          })}
      </section>
      {MAXPOKEMONSRENDERED + POKEMONSPERPAGE > POKEMONSPERPAGE * pagination && (
        <div className={styles.loader} ref={loadingRef}>
          <div className={styles.bounceOne}></div>
          <div className={styles.bounceTwo}></div>
          <div className={styles.bounceThree}></div>
        </div>
      )}
    </>
  );
};
