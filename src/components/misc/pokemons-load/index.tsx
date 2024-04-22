"use client";
import { AsyncReturnType } from "@/@types/async-return-type";
import { Loader } from "@/components/ui/loader";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { MAXPOKEMONSRENDERED, POKEMONSPERPAGE } from "@/services/api";
import {
  getLoadPokemonData,
  getPokemonsByPagination,
} from "@/services/requests";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONWEIGHTS,
} from "@/utils/selects-data";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { PokemonCard } from "../pokemon-card";
import styles from "./styles.module.scss";

type PokemonsLoadProps = {
  toggleAsideIsOpen: (newValue?: boolean) => void;
};

export const PokemonsLoad = ({ toggleAsideIsOpen }: PokemonsLoadProps) => {
  const [ref, entry] = useIntersectionObserver({
    rootMargin: "0% 0% 200px",
  });
  const { search, from, to, type, weakness, ability, weight, height, order } =
    usePokemonQueryParams();

  const [pokemons, setPokemons] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const DESCPokemons = () => {
      setPokemons((prevPokemons) =>
        prevPokemons?.slice().sort((a, b) => b.id - a.id)
      );
    };
    const ASCPokemons = () => {
      setPokemons((prevPokemons) =>
        prevPokemons?.slice().sort((a, b) => a.id - b.id)
      );
    };

    order?.toLowerCase() === "asc" && ASCPokemons();
    order?.toLowerCase() === "desc" && DESCPokemons();
  }, [order]);

  useEffect(() => {
    const getPokemons = async () => {
      if (loading || !entry?.isIntersecting) return;
      setLoading(true);

      const response = await getPokemonsByPagination(pagination);
      setPokemons((prevPokemons) => [...prevPokemons, ...response]);
      setPagination((prevState) => prevState + 1);
      setLoading(false);
    };

    getPokemons();
  }, [pagination, loading, entry?.isIntersecting]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      const searchVerification =
        !search?.trim() ||
        search == null ||
        pokemon.name.toLowerCase().includes(search.toLowerCase());
      const idVerification =
        (from == null || pokemon.id >= from) &&
        (to == null || pokemon.id <= to);
      const typeVerification =
        !type ||
        type
          .split(",")
          .every((selectedType) =>
            pokemon.types.some(
              (pokemonType) => pokemonType.type.name === selectedType
            )
          );
      const weaknessVerification =
        !weakness ||
        weakness
          .split(",")
          .every((selectedWeakness) =>
            pokemon.weakness.some(
              (pokemonWeakness) => pokemonWeakness === selectedWeakness
            )
          );
      const abilityVerification =
        !ability ||
        pokemon.abilities.some(
          (pokemonAbility) =>
            pokemonAbility.ability.name.toLowerCase() === ability.toLowerCase()
        );
      const weightVerification =
        !weight ||
        (pokemon.weight / 10 > SELECTPOKEMONWEIGHTS[weight - 1]?.range?.min &&
          pokemon.weight / 10 <= SELECTPOKEMONWEIGHTS[weight - 1]?.range?.max);
      const heightVerification =
        !height ||
        (pokemon.height / 10 > SELECTPOKEMONHEIGHTS[height - 1]?.range?.min &&
          pokemon.height / 10 <= SELECTPOKEMONHEIGHTS[height - 1]?.range?.max);

      return (
        searchVerification &&
        idVerification &&
        typeVerification &&
        weaknessVerification &&
        abilityVerification &&
        weightVerification &&
        heightVerification
      );
    });
  }, [pokemons, search, from, to, type, weakness, ability, weight, height]);

  return (
    <>
      <section className={styles.pokemons}>
        {filteredPokemons.map((pokemon, index) => {
          return (
            <PokemonCard key={index} onClick={() => toggleAsideIsOpen(true)} {...pokemon} />
          );
        })}
      </section>
      {MAXPOKEMONSRENDERED + POKEMONSPERPAGE > POKEMONSPERPAGE * pagination && (
        <Loader ref={ref} />
      )}
    </>
  );
};
