"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectItemPokemonGeneration,
  SelectItemPokemonType,
} from "../Select";

const SelectPokemonTypes = [
  { value: "normal" },
  { value: "fire" },
  { value: "fighting" },
  { value: "water" },
  { value: "flying" },
  { value: "grass" },
  { value: "poison" },
  { value: "electric" },
  { value: "ground" },
  { value: "psychic" },
  { value: "rock" },
  { value: "ice" },
  { value: "bug" },
  { value: "dragon" },
  { value: "ghost" },
  { value: "dark" },
  { value: "steel" },
  { value: "fairy" },
];

const SelectPokemonGenerations = [
  { label: "I", value: "1"  },
  { label: "II", value: "2"  },
  { label: "III", value: "3"  },
  { label: "IV", value: "4"  },
  { label: "V", value: "5"  },
  { label: "VI", value: "6"  },
  { label: "VII", value: "7"  },
];
export const PokemonControllers = () => {
  const [from, setFrom] = useQueryState("from");
  const [to, setTo] = useQueryState("to");
  const [type, setType] = useQueryState("type");
  const [weakness, setWeakness] = useQueryState("weakness");
  const [generation, setGeneration] = useQueryState("generation");

  return (
    <>
      <div className={styles.search}>
        <input type="text" placeholder="Search your pokemon!" max={50} />
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
            <div className={styles.triggerPlaceholder}>
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
          {SelectPokemonTypes.map((type, key) => {
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
            <div className={styles.triggerPlaceholder}>
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
          {SelectPokemonTypes.map((type, key) => {
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
          value={!generation ? "" : generation}
          onValueChange={(event) => {
            setGeneration(event);
          }}
          placeholder={
            <div className={styles.triggerPlaceholder}>
              <Image
                width={15}
                height={15}
                src="/icons/pokeball-gray.svg"
                alt="icon"
              />
              <p>Generation</p>
            </div>
          }
        >
          {SelectPokemonGenerations.map((generation, key) => {
            return (
              <SelectItemPokemonGeneration key={key} value={generation.value}>
                {generation.label}
              </SelectItemPokemonGeneration>
            );
          })}
        </Select>
      </div>
    </>
  );
};
