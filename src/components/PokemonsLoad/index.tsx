"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { getPokemons } from "@/services/serverRequests";
import { PokemonType } from "@/@types/PokemonType";
import { PokemonCard } from "../PokemonCard";

let pagination = 1;

export const PokemonsLoad = () => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<PokemonType[]>([]);

  useEffect(() => {
    if (inView) {
      getPokemons(pagination).then((res: PokemonType[]) => {
        setData([...data, ...res]);
        pagination++;
      });
    }
  }, [data, inView]);

  return (
    <>
      <section className={styles.pokemons}>
        {data.map((pokemon) => {
          return <PokemonCard key={pokemon.id} {...pokemon} />;
        })}
      </section>
      <div className={styles.loader} ref={ref}>
        <div className={styles.bounceOne}></div>
        <div className={styles.bounceTwo}></div>
        <div className={styles.bounceThree}></div>
      </div>
    </>
  );
};
