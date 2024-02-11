"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectItemPokemonAbility,
  SelectItemPokemonNumber,
  SelectItemPokemonType,
} from "../select";
import { getAllPokemonAbilities } from "@/services/client-requests";
import { useEffect, useState } from "react";
import { Ability } from "@/@types/pokemons-abilities";
import { SELECTPOKEMONTYPES, SELECTPOKEMONHEIGHTS, SELECTPOKEMONWEIGHTS } from "@/utils/pokemons";

export const PokemonFilters = () => {
  const [search, setSearch] = useQueryState("search");
  const [from, setFrom] = useQueryState("from");
  const [to, setTo] = useQueryState("to");
  const [type, setType] = useQueryState("type");
  const [weakness, setWeakness] = useQueryState("weakness");
  const [ability, setAbility] = useQueryState("ability");
  const [height, setHeight] = useQueryState("height");
  const [weight, setWeight] = useQueryState("weight");
  const [abilities, setAbilities] = useState<Ability[]>();

  const fetchPokemonAbilities = async () => {
    const abilities = await getAllPokemonAbilities();

    return abilities;
  };

  useEffect(() => {
    fetchPokemonAbilities().then((data) => {
      setAbilities(data);
    });
  }, []);

  return (
    <>
      <div className={styles.search}>
        <input
          value={search || ""}
          onChange={(event) => setSearch(event.target.value)}
          type="text"
          placeholder="Search your pokemon!"
          max={50}
        />
        <button>
          <Image
            width={20}
            height={20}
            src="/icons/pokeball.svg"
            alt="Pokeball icon"
          />
        </button>
      </div>
      <div className={styles.listAttributes}>
        <div></div>
        <div className={styles.idLimit}>
          <label htmlFor="from">from</label>
          <input
            value={from || ""}
            onChange={(e) => setFrom(e.target.value)}
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="from"
            id="from"
          />
          <label htmlFor="to">to</label>
          <input
            value={to || ""}
            onChange={(e) => setTo(e.target.value)}
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
          value={!type ? "" : type}
          onValueChange={(event) => {
            setType(event);
          }}
          placeholder={
            <div className={styles.placeholder}>
              <Image
                width={15}
                height={15}
                src="/icons/target.svg"
                alt="icon"
              />
              <p>Type</p>
            </div>
          }
        >
          {SELECTPOKEMONTYPES.map((type, key) => {
            return (
              <SelectItemPokemonType
                key={key}
                type={type.value}
                value={type.value}
              >
                {type.value}
              </SelectItemPokemonType>
            );
          })}
        </Select>
        <Select
          value={!weakness ? "" : weakness}
          onValueChange={(event) => {
            setWeakness(event);
          }}
          placeholder={
            <div className={styles.placeholder}>
              <Image
                width={15}
                height={15}
                src="/icons/weakness.svg"
                alt="icon"
              />
              <p>Weakness</p>
            </div>
          }
        >
          {SELECTPOKEMONTYPES.map((type, key) => {
            return (
              <SelectItemPokemonType
                key={key}
                type={type.value}
                value={type.value}
              >
                {type.value}
              </SelectItemPokemonType>
            );
          })}
        </Select>
        <Select
          value={!ability ? "" : ability}
          onValueChange={(event) => {
            setAbility(event);
          }}
          placeholder={
            <div className={styles.placeholder}>
              <Image
                width={15}
                height={15}
                src="/icons/pokeball-gray.svg"
                alt="icon"
              />
              <p>Ability</p>
            </div>
          }
        >
          {abilities
            ?.sort((current, next) => {
              return current.name
                .toLowerCase()
                .localeCompare(next.name.toLowerCase());
            })
            ?.map((ability, key) => {
              return (
                <SelectItemPokemonAbility key={key} value={ability.name}>
                  {ability.name}
                </SelectItemPokemonAbility>
              );
            })}
        </Select>
        <Select
          value={!height ? "" : height}
          onValueChange={(event) => {
            setHeight(event);
          }}
          placeholder={
            <div className={styles.placeholder}>
              <Image width={15} height={15} src="/icons/egg.svg" alt="icon" />
              <p>Height</p>
            </div>
          }
        >
          {SELECTPOKEMONHEIGHTS.map((height, key) => {
            return (
              <SelectItemPokemonNumber key={key} value={key.toString()}>
                {height.label}
              </SelectItemPokemonNumber>
            );
          })}
        </Select>
        <Select
          value={!weight ? "" : weight}
          onValueChange={(event) => {
            setWeight(event);
          }}
          placeholder={
            <div className={styles.placeholder}>
              <Image
                width={15}
                height={15}
                src="/icons/weight.svg"
                alt="icon"
              />
              <p>Weight</p>
            </div>
          }
        >
          {SELECTPOKEMONWEIGHTS.map((weight, key) => {
            return (
              <SelectItemPokemonNumber key={key} value={key.toString()}>
                {weight.label}
              </SelectItemPokemonNumber>
            );
          })}
        </Select>
        <button
          onClick={() => {
            setType("");
            setWeakness("");
            setAbility("");
            setHeight("");
            setWeight("");
          }}
          className={styles.clear}
        >
          <Image
            width={20}
            height={20}
            src="/icons/trash.svg"
            alt="Trash icon"
          />
        </button>
      </div>
    </>
  );
};
