"use client";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemons } from "@/services/server-requests";
import { PokemonCard } from "../PokemonCard";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import { useQueryState } from "nuqs";
import { Pokemon, PokemonPosibleTypes } from "@/@types/pokemon";

export const PokemonsLoad = () => {
  const { ref: loadingRef, inView } = useInView();
  const [pokemons, setPokemonsData] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState(1);
  const [from] = useQueryState("from");
  const [to] = useQueryState("to");
  const [type] = useQueryState("type");
  const [weakness] = useQueryState("weakness");

  useEffect(() => {
    if (inView) {
      fetchPokemons(pagination).then((res: Pokemon[]) => {
        setPokemonsData([...pokemons, ...res]);
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
          })
          .filter((pokemon) => {
            const types = pokemon.types.map((type) => type.type.name);
            const newType = type as PokemonPosibleTypes;

            if (type != null && types.includes(newType)) {
              return pokemon;
            }

            if (type == null) {
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
