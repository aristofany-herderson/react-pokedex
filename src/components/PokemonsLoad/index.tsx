"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { getPokemons } from "@/services/serverRequests";
import { PokemonType } from "@/@types/PokemonType";
import { PokemonCard } from "../PokemonCard";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemonsData] = useState<PokemonType[]>([]);
  const [pagination, setPagination] = useState(1);

  useEffect(() => {
    if (inView) {
      getPokemons(pagination).then((res: PokemonType[]) => {
        setPokemonsData([...pokemons, ...res]);
        setPagination(pagination + 1);
      });
    }
  }, [pokemons, inView]);
  
  return (
    <>
      <section className={styles.pokemons}>
        {pokemons
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
