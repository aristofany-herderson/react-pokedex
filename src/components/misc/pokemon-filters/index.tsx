"use client";
import { HeightIcon } from "@/components/ui/icons/height-icon";
import { PokeballIcon } from "@/components/ui/icons/pokeball-icon";
import { TargetIcon } from "@/components/ui/icons/target-icon";
import { TrashIcon } from "@/components/ui/icons/trash-icon";
import { WeaknessIcon } from "@/components/ui/icons/weakness-icon";
import { WeightIcon } from "@/components/ui/icons/weight-icon";
import {
  Select,
  SelectionData,
  SelectPlaceholder,
} from "@/components/ui/select/";
import {
  AbilityOption,
  NumberOption,
  OrderOption,
  TypeOption,
} from "@/components/ui/select/option";
import { TransparentTrigger } from "@/components/ui/select/trigger";
import {
  AbilityValue,
  NumberValue,
  OrderValue,
  TypeValue,
} from "@/components/ui/select/value";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { MAXPOKEMONSRENDERED } from "@/services/api";
import { getAllPokemonsAbilities } from "@/services/requests";
import {
  SELECTPOKEMONHEIGHTS,
  SELECTPOKEMONORDER,
  SELECTPOKEMONTYPES,
  SELECTPOKEMONWEIGHTS,
} from "@/utils/selects-data";
import { useDebounce } from "@uidotdev/usehooks";
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

  const [abilities, setAbilities] = useState<SelectionData[]>([]);
  const [searchInputText, setSearchInputText] = useState(search);
  const searchQuery = useDebounce(searchInputText, 750);
  const [fromInputText, setFromInputText] = useState(from);
  const fromQuery = useDebounce(fromInputText, 750);
  const [toInputText, setToInputText] = useState(to);
  const toQuery = useDebounce(toInputText, 750);

  useEffect(() => {
    if (searchQuery) {
      startTransition(() => {
        setSearch(searchQuery);
      });

      return;
    }

    startTransition(() => {
      setSearch(null);
    });
  }, [searchQuery, setSearch, search]);

  useEffect(() => {
    if (fromQuery) {
      startTransition(() => {
        setFrom(fromQuery);
      });

      return;
    }

    startTransition(() => {
      setFrom(null);
    });
  }, [fromQuery, setFrom, from]);

  useEffect(() => {
    if (toQuery) {
      startTransition(() => {
        setTo(toQuery);
      });

      return;
    }

    startTransition(() => {
      setTo(null);
    });
  }, [toQuery, setTo, to]);

  useEffect(() => {
    if (searchQuery) {
      startTransition(() => {
        setSearch(searchQuery);
      });

      return;
    }

    startTransition(() => {
      setSearch(null);
    });
  }, [searchQuery, setSearch, search]);

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
          onChange={
            (({ value }: SelectionData) => {
              startTransition(() => {
                setOrder(value);
              });
            }) as (state: unknown) => void
          }
          components={{
            Option: OrderOption,
            MultiValue: OrderValue,
            Control: TransparentTrigger,
          }}
          isClearable={false}
          options={SELECTPOKEMONORDER}
        />
        <div className={styles.idLimit}>
          <label htmlFor="from">from</label>
          <input
            value={fromInputText || ""}
            onChange={(event) =>
              setFromInputText(Number(event.target.value))
            }
            min={1}
            max={MAXPOKEMONSRENDERED}
            type="number"
            name="from"
            id="from"
          />
          <label htmlFor="to">to</label>
          <input
            value={toInputText || ""}
            onChange={(event) =>
              setToInputText(Number(event.target.value))
            }
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
          placeholder={
            <SelectPlaceholder
              key="placeholder"
              leftIcon={<TargetIcon width={15} height={15} />}
            >
              Type
            </SelectPlaceholder>
          }
          value={
            type
              ? SELECTPOKEMONTYPES.filter((selectType) =>
                  type.split(",").includes(selectType.value)
                )
              : null
          }
          onChange={
            ((value: SelectionData[]) => {
              startTransition(() => {
                setType(
                  value.length > 0
                    ? value.map((type) => type.value).join(",")
                    : null
                );
              });
            }) as (state: unknown) => void
          }
          components={{
            Option: TypeOption,
            MultiValue: TypeValue,
          }}
          isMulti
          options={SELECTPOKEMONTYPES}
          closeMenuOnSelect={false}
        />
        <Select
          placeholder={
            <SelectPlaceholder
              key="placeholder"
              leftIcon={<WeaknessIcon width={15} height={15} />}
            >
              Weakness
            </SelectPlaceholder>
          }
          value={
            weakness
              ? SELECTPOKEMONTYPES.filter((selectType) =>
                  weakness.split(",").includes(selectType.value)
                )
              : null
          }
          onChange={
            ((value: SelectionData[]) =>
              setWeakness(
                value.length > 0
                  ? value.map((type) => type.value).join(",")
                  : null
              )) as (state: unknown) => void
          }
          components={{
            Option: TypeOption,
            MultiValue: TypeValue,
          }}
          isMulti
          options={SELECTPOKEMONTYPES}
          closeMenuOnSelect={false}
        />

        <Select
          placeholder={
            <SelectPlaceholder
              key="placeholder"
              leftIcon={<PokeballIcon width={15} height={15} />}
            >
              Ability
            </SelectPlaceholder>
          }
          value={
            ability
              ? abilities.find(
                  (currentAbility) => currentAbility.value === ability
                )
              : null
          }
          onChange={
            ((value: SelectionData) => setAbility(value?.value || null)) as (
              state: unknown
            ) => void
          }
          components={{
            Option: AbilityOption,
            SingleValue: AbilityValue,
          }}
          options={abilities.sort((current, next) =>
            current.value.toLowerCase().localeCompare(next.value.toLowerCase())
          )}
        />
        <Select
          placeholder={
            <SelectPlaceholder
              key="placeholder"
              leftIcon={<HeightIcon width={15} height={15} />}
            >
              Height
            </SelectPlaceholder>
          }
          value={height ? SELECTPOKEMONHEIGHTS[height - 1] : null}
          onChange={
            ((value: SelectionData) =>
              setHeight(value && Number(value?.value))) as (
              state: unknown
            ) => void
          }
          components={{
            Option: NumberOption,
            SingleValue: NumberValue,
          }}
          options={SELECTPOKEMONHEIGHTS}
        />

        <Select
          placeholder={
            <SelectPlaceholder
              key="placeholder"
              leftIcon={<WeightIcon width={15} height={15} />}
            >
              Weight
            </SelectPlaceholder>
          }
          value={weight ? SELECTPOKEMONWEIGHTS[weight - 1] : null}
          onChange={
            ((value: SelectionData) =>
              setWeight(value && Number(value?.value))) as (
              state: unknown
            ) => void
          }
          components={{
            Option: NumberOption,
            SingleValue: NumberValue,
          }}
          options={SELECTPOKEMONWEIGHTS}
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
