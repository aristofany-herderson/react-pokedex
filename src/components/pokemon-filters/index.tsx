"use client";
import {
  Select,
  SelectPlaceholder,
  SelectValueData,
} from "@/components/select";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { getAllPokemonAbilities } from "@/services/requests";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONORDER,
  SELECTPOKEMONTYPES,
  SELECTPOKEMONWEIGHTS,
} from "@/utils/pokemons";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const PokemonFilters = () => {
  const [abilities, setAbilities] = useState<SelectValueData[]>();
  const {
    order,
    ability,
    from,
    height,
    search,
    setOrder,
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
          label: `${ability.name.charAt(0).toUpperCase()}${ability.name.slice(
            1
          )}`,
        };
      });

      setAbilities(response);
    };

    fetchPokemonAbilities();
  }, []);

  return (
    <>
      <label htmlFor="search" className={styles.search}>
        <input
          spellCheck={false}
          value={search || ""}
          id="search"
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
      </label>
      <div className={styles.listAttributes}>
        <Select
          defaultValue={
            order
              ? SELECTPOKEMONORDER.find(
                  (orderType) => orderType.value === order
                )
              : SELECTPOKEMONORDER[0]
          }
          type="order"
          onChange={
            (({ value }: SelectValueData) => {
              setOrder(value);
            }) as (state: unknown) => void
          }
          isClearable={false}
          name="order"
          options={SELECTPOKEMONORDER}
        />
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
              ? SELECTPOKEMONTYPES.filter((selectType) =>
                  type.split(",").includes(selectType.value)
                )
              : null
          }
          onChange={
            ((value: SelectValueData[]) => {
              setType(
                value.length > 0
                  ? value.map((type) => type.value).join(",")
                  : null
              );
            }) as (state: unknown) => void
          }
          name="type"
          options={SELECTPOKEMONTYPES}
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
              ? SELECTPOKEMONTYPES.filter((selectType) =>
                  weakness.split(",").includes(selectType.value)
                )
              : null
          }
          onChange={
            ((value: SelectValueData[]) => {
              setWeakness(
                value.length > 0
                  ? value.map((type) => type.value).join(",")
                  : null
              );
            }) as (state: unknown) => void
          }
          name="weakness"
          options={SELECTPOKEMONTYPES}
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
          type="ability"
          value={
            ability
              ? abilities?.find(
                  (currentAbility) => currentAbility.value === ability
                )
              : null
          }
          onChange={
            (({ value }: SelectValueData) => {
              setAbility(value);
            }) as (state: unknown) => void
          }
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
          type="number"
          value={height ? SELECTPOKEMONHEIGHTS[height - 1] : null}
          onChange={
            ((value: SelectValueData) => {
              setHeight(value && Number(value?.value));
            }) as (state: unknown) => void
          }
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
          type="number"
          value={weight ? SELECTPOKEMONWEIGHTS[weight - 1] : null}
          onChange={
            ((value: SelectValueData) => {
              setWeight(value && Number(value?.value));
            }) as (state: unknown) => void
          }
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
          className={styles.clear}
          onClick={() => {
            setType(null);
            setWeakness(null);
            setAbility(null);
            setHeight(null);
            setWeight(null);
          }}
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
