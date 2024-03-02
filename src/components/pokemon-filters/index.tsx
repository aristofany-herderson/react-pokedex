"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { getAllPokemonAbilities } from "@/services/requests";
import { useEffect, useState } from "react";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONWEIGHTS,
  SELECTPOKEMONTYPESMULTI,
} from "@/utils/pokemons";
import { usePokemonQueryParams } from "@/hooks/usePokemonQueryParams";
import { Select, SelectPlaceholder, SelectValueData } from "@/components/pokemon-select";

export const PokemonFilters = () => {
  const [abilities, setAbilities] = useState<SelectValueData[]>();
  const {
    ability,
    from,
    height,
    search,
    setAbility,
    setFrom,
    setHeight,
    setSearch,
    setTo,
    setType,
    setWeakness,
    setWeight,
    to,
    type,
    weakness,
    weight,
  } = usePokemonQueryParams();

  useEffect(() => {
    const getPokemonAbilities = async () => {
      const abilities = await getAllPokemonAbilities();
      return abilities;
    };

    const fetchPokemonAbilities = async () => {
      const data = await getPokemonAbilities();
      const response = data.map((ability) => {
        return {
          value: ability.name,
          label: `${ability.name.charAt(0).toUpperCase()}${ability.name.slice(1)}`,
        };
      });

      setAbilities(response);
    };

    fetchPokemonAbilities();
  }, []);

  return (
    <>
      <div className={styles.search}>
        <input
          spellCheck={false}
          value={search || ""}
          onChange={(event) => setSearch(event.target.value || null)}
          type="text"
          placeholder="Search your pokemon!"
          max={50}
        />
        <button aria-label="clear" onClick={() => setSearch(null)}>
          <Image
            width={20}
            height={20}
            src="/icons/pokeball.svg"
            alt="Pokeball icon"
          />
        </button>
      </div>
      <div className={styles.listAttributes}>
        <div className={styles.idLimit}>
          <label htmlFor="from">from</label>
          <input
            value={from || ""}
            onChange={(event) => setFrom(Number(event.target.value) || null)}
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="from"
            id="from"
          />
          <label htmlFor="to">to</label>
          <input
            value={to || ""}
            onChange={(event) => setTo(Number(event.target.value) || null)}
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="to"
            id="to"
          />
        </div>
      </div>
      <div className={styles.pokemonAttributes}>
        <Select
          isMulti
          value={
            type
              ? type?.split(",").map((current) => {
                  return {
                    value: current,
                    label: current,
                  };
                })
              : ""
          }
          onChange={(state) => {
            const currentState = state as SelectValueData[];
            setType(
              currentState.length > 0
                ? currentState.map((type) => type.value).join(",")
                : null
            );
          }}
          name="type"
          options={SELECTPOKEMONTYPESMULTI}
          placeholder={
            <SelectPlaceholder
              icon={{
                width: 15,
                height: 15,
                src: "/icons/target.svg",
                alt: "Pokemon type icon",
              }}
              label="Type"
            />
          }
        />
        <Select
          isMulti
          value={
            weakness
              ? weakness?.split(",").map((current) => {
                  return {
                    value: current,
                    label: current,
                  };
                })
              : ""
          }
          onChange={(state) => {
            const currentState = state as SelectValueData[];
            setWeakness(
              currentState.length > 0
                ? currentState.map((type) => type.value).join(",")
                : null
            );
          }}
          name="weakness"
          options={SELECTPOKEMONTYPESMULTI}
          placeholder={
            <SelectPlaceholder
              icon={{
                width: 15,
                height: 15,
                src: "/icons/weakness.svg",
                alt: "Pokemon weakness icon",
              }}
              label="Weakness"
            />
          }
        />
        <Select
          optionType="ability"
          value={ability ? { value: ability, label: ability } : ""}
          onChange={(state) => {
            const currentState = state as SelectValueData;
            setAbility(currentState?.value || null);
          }}
          name="ability"
          options={abilities?.sort((current, next) => {
            return current.value
              .toLowerCase()
              .localeCompare(next.value.toLowerCase());
          })}
          placeholder={
            <SelectPlaceholder
              icon={{
                width: 15,
                height: 15,
                src: "/icons/pokeball-gray.svg",
                alt: "Pokemon weakness icon",
              }}
              label="Ability"
            />
          }
        />
        <Select
          optionType="number"
          value={height ? SELECTPOKEMONHEIGHTS[height - 1] : ""}
          onChange={(state) => {
            const currentState = state as SelectValueData;
            setHeight(Number(currentState?.value));
          }}
          name="height"
          options={SELECTPOKEMONHEIGHTS}
          placeholder={
            <SelectPlaceholder
              icon={{
                width: 15,
                height: 15,
                src: "/icons/egg.svg",
                alt: "Pokemon height icon",
              }}
              label="Height"
            />
          }
        />
        <Select
          optionType="number"
          value={weight ?  SELECTPOKEMONWEIGHTS[weight - 1] : ""}
          onChange={(state) => {
            const currentState = state as SelectValueData;
            setWeight(Number(currentState?.value));
          }}
          name="weight"
          options={SELECTPOKEMONWEIGHTS}
          placeholder={
            <SelectPlaceholder
              icon={{
                width: 15,
                height: 15,
                src: "/icons/weight.svg",
                alt: "Pokemon weight icon",
              }}
              label="Weight"
            />
          }
        />
        <button
          aria-label="clear"
          onClick={() => {
            setType(null);
            setWeakness(null);
            setAbility(null);
            setHeight(null);
            setWeight(null);
          }}
          className={styles.clear}
        >
          <Image
            width={20}
            height={20}
            src="/icons/trash.svg"
            alt="Clear filters icon"
          />
        </button>
      </div>
    </>
  );
};
