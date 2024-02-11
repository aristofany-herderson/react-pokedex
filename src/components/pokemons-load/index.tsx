"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/server-requests";
import { PokemonCard } from "../pokemon-card";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { AsyncReturnType } from "@/@types/async-return-type";
import { getLoadPokemonData } from "@/services/client-requests";
import { filter } from "@/utils/pokemon-filter";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemonsData] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);

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
        {filter(pokemons)
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
