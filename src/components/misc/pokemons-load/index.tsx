"use client";
import { AsyncReturnType } from "@/@types/async-return-type";
import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
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
import { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonCard } from "../pokemon-card";
import styles from "./styles.module.scss";

export const PokemonsLoad = () => {
  const [isPending, startTransition] = useTransition();
  const { ref, inView } = useInView();
  const { search, from, to, type, weakness, ability, weight, height, order } =
    usePokemonQueryParams();

  const [pokemons, setPokemons] = useState<
    AsyncReturnType<typeof getLoadPokemonData>[]
  >([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const DESCPokemons = () => {
      startTransition(() => {
        setPokemons((prevPokemons) =>
          prevPokemons?.slice().sort((a, b) => b.id - a.id)
        );
      });
    };
    const ASCPokemons = () => {
      startTransition(() => {
        setPokemons((prevPokemons) =>
          prevPokemons?.slice().sort((a, b) => a.id - b.id)
        );
      });
    };

    order?.toLowerCase() === "asc" && ASCPokemons();
    order?.toLowerCase() === "desc" && DESCPokemons();
  }, [order]);

  useEffect(() => {
    const getPokemons = async () => {
      if (loading || !inView) return;
      setLoading(true);

      const response = await getPokemonsByPagination(pagination);
      setPokemons((prevPokemons) => [...prevPokemons, ...response]);
      setPagination((prevState) => prevState + 1);
      setLoading(false);
    };

    getPokemons();
  }, [pagination, loading, inView]);

  return (
    <>
      <section className={styles.pokemons}>
        {pokemons
          .filter((pokemon) => {
            const searchVerification = !search?.trim() || search == null;
            const searchProximityVerification = pokemon.name
              .toLowerCase()
              .includes(search?.toLowerCase() || "");
            const fromVerification =
              from != null ? pokemon.id >= from : pokemon.id >= 0;
            const toVerification =
              to != null ? pokemon.id <= to : pokemon.id <= MAXPOKEMONSRENDERED;
            const types = pokemon.types.map((type) => type.type.name);
            const currentType = type?.split(",") as PokemonPossibleTypes[];
            const typeVerification = currentType?.every((type) =>
              types?.includes(type)
            );
            const weaknesses = pokemon.weakness;
            const currentWeakness = weakness?.split(
              ","
            ) as PokemonPossibleTypes[];
            const weaknessVerification = currentWeakness?.every((type) =>
              weaknesses?.includes(type)
            );
            const abilities = pokemon.abilities.map((ability) =>
              ability.ability.name.toLowerCase()
            );
            const currentAbility = ability as string;
            const currentWeight = weight;
            const pokemonWeight = pokemon.weight / 10;
            const minWeightVerification =
              currentWeight != null &&
              pokemonWeight >
                SELECTPOKEMONWEIGHTS[currentWeight - 1]?.range?.min;
            const maxWeightVerification =
              currentWeight != null &&
              pokemonWeight <=
                SELECTPOKEMONWEIGHTS[currentWeight - 1]?.range?.max;
            const currentHeight = height;
            const pokemonHeight = pokemon.height / 10;

            const minHeightVerification =
              currentHeight != null &&
              pokemonHeight >
                SELECTPOKEMONHEIGHTS[currentHeight - 1]?.range?.min;
            const maxHeightVerification =
              currentHeight != null &&
              pokemonHeight <=
                SELECTPOKEMONHEIGHTS[currentHeight - 1]?.range?.max;

            if (
              (searchVerification || searchProximityVerification) &&
              ((fromVerification && toVerification) ||
                (from == null && to == null)) &&
              ((currentType?.length > 0 && typeVerification) ||
                currentType == null) &&
              ((currentWeakness?.length > 0 && weaknessVerification) ||
                currentWeakness == null) &&
              ((ability != null &&
                abilities.includes(currentAbility.toLowerCase())) ||
                ability == null ||
                ability == undefined) &&
              ((minWeightVerification && maxWeightVerification) ||
                currentWeight == null) &&
              ((minHeightVerification && maxHeightVerification) ||
                currentHeight == null)
            ) {
              return true;
            }

            return false;
          })
          .map((pokemon, index) => {
            return <PokemonCard key={index} {...pokemon} />;
          })}
      </section>
      {MAXPOKEMONSRENDERED + POKEMONSPERPAGE > POKEMONSPERPAGE * pagination && (
        <Loader ref={ref} />
      )}
    </>
  );
};
