"use client";
import { HeightIcon } from "@/components/ui/icons/height-icon";
import { PokeballIcon } from "@/components/ui/icons/pokeball-icon";
import { TargetIcon } from "@/components/ui/icons/target-icon";
import { TrashIcon } from "@/components/ui/icons/trash-icon";
import { WeaknessIcon } from "@/components/ui/icons/weakness-icon";
import { WeightIcon } from "@/components/ui/icons/weight-icon";
import {
  Select,
  SelectPlaceholder,
  SelectValueData,
} from "@/components/ui/select";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { getAllPokemonsAbilities } from "@/services/requests";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONORDER,
  SELECTPOKEMONTYPES,
  SELECTPOKEMONWEIGHTS,
} from "@/utils/selects-data";
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState, useTransition } from "react";
import styles from "./styles.module.scss";


export const PokemonFilters = () => {
  const [isPending, startTransition] = useTransition();
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

  const [abilities, setAbilities] = useState<SelectValueData[]>([]);
  const [searchInputText, setSearchInputText] = useState(search);
  const searchQuery = useDebounce(searchInputText, 750)

  useEffect(() => {
    if (searchQuery) {
      startTransition(() => {
        setSearch(searchQuery)
      })

      return;
    }

    startTransition(() => {
      setSearch(null)
    })
  }, [searchQuery, setSearch, search])

  useEffect(() => {
    const getPokemonAbilities = async () => {
      const abilities = await getAllPokemonsAbilities();
      return abilities;
    };

    const fetchPokemonAbilities = async () => {
      const data = await getPokemonAbilities();
      const response = data.map((ability) => ({
        value: ability.name,
        label: `${ability.name.charAt(0).toUpperCase()}${ability.name.slice(
          1
        )}`,
      }));

      setAbilities(response);
    };

    fetchPokemonAbilities();
  }, []);

  return (
    <section className={styles.section}>
      <label htmlFor="search" className={styles.search}>
        <input
          spellCheck={false}
          value={searchInputText || ""}
          id="search"
          onChange={(event) => setSearchInputText(event.target.value)}
          type="text"
          placeholder="Search your pokemon"
          max={50}
        />
        <button aria-label="clear" onClick={() => setSearchInputText(null)}>
          <PokeballIcon width={20} height={20} />
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
            (({ value }: SelectValueData) => setOrder(value)) as (
              state: unknown
            ) => void
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
            ((value: SelectValueData[]) =>
              setType(
                value.length > 0
                  ? value.map((type) => type.value).join(",")
                  : null
              )) as (state: unknown) => void
          }
          name="type"
          closeMenuOnSelect={false}
          options={SELECTPOKEMONTYPES}
          placeholder={
            <SelectPlaceholder
              icon={<TargetIcon width={15} height={15} />}
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
            ((value: SelectValueData[]) =>
              setWeakness(
                value.length > 0
                  ? value.map((type) => type.value).join(",")
                  : null
              )) as (state: unknown) => void
          }
          name="weakness"
          closeMenuOnSelect={false}
          options={SELECTPOKEMONTYPES}
          placeholder={
            <SelectPlaceholder
              icon={<WeaknessIcon width={15} height={15} />}
              label="Weakness"
            />
          }
        />
        <Select
          type="ability"
          value={
            ability
              ? abilities.find(
                  (currentAbility) => currentAbility.value === ability
                )
              : null
          }
          onChange={
            ((value: SelectValueData) => setAbility(value?.value || null)) as (
              state: unknown
            ) => void
          }
          name="ability"
          options={abilities.sort((current, next) =>
            current.value.toLowerCase().localeCompare(next.value.toLowerCase())
          )}
          placeholder={
            <SelectPlaceholder
              icon={<PokeballIcon width={15} height={15} />}
              label="Ability"
            />
          }
        />
        <Select
          type="number"
          value={height ? SELECTPOKEMONHEIGHTS[height - 1] : null}
          onChange={
            ((value: SelectValueData) =>
              setHeight(value && Number(value?.value))) as (
              state: unknown
            ) => void
          }
          name="height"
          options={SELECTPOKEMONHEIGHTS}
          placeholder={
            <SelectPlaceholder
              icon={<HeightIcon width={15} height={15} />}
              label="Height"
            />
          }
        />
        <Select
          type="number"
          value={weight ? SELECTPOKEMONWEIGHTS[weight - 1] : null}
          onChange={
            ((value: SelectValueData) =>
              setWeight(value && Number(value?.value))) as (
              state: unknown
            ) => void
          }
          name="weight"
          options={SELECTPOKEMONWEIGHTS}
          placeholder={
            <SelectPlaceholder
              icon={<WeightIcon width={15} height={15} />}
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
          <TrashIcon width={20} height={20} />
        </button>
      </div>
    </section>
  );
};
