"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import {
  getPokemonByNameOrID,
  getPokemonEntry,
  getPokemonGenderProps,
  getPokemonWeakness,
} from "@/services/clientRequests";
import { useEffect, useState } from "react";
import { PokemonProps } from "@/@types/PokemonProps";
import { PokemonTypeNameProps } from "@/@types/PokemonTypeProps";
import { baseImageUrl } from "@/services/api";
import { POKEMONTYPECOLORS, POKEMONSTATS } from "@/utils/pokemons";
import { useQueryState } from "nuqs";

type PokemonDataProps = {
  pokemonData: PokemonProps;
  pokemonEntry: string;
  pokemonGenderProps: {
    isFemale: boolean;
    isMale: boolean;
  };
  pokemonWeakness: PokemonTypeNameProps[];
};

export const PokemonAside = () => {
  const [pokemon, setPokemonData] = useState<PokemonDataProps>();
  const [selectedPokemon, _] = useQueryState("pokemon");

  const resquests = async () => {
    if (selectedPokemon) {
      const pokemonData = await getPokemonByNameOrID(selectedPokemon);
      const pokemonEntry = (await getPokemonEntry(pokemonData.id)).replace(
        "\f",
        " "
      );
      const pokemonGenderProps = await getPokemonGenderProps(selectedPokemon);
      const pokemonWeakness = await getPokemonWeakness(selectedPokemon);

      const data = {
        pokemonData,
        pokemonEntry,
        pokemonGenderProps,
        pokemonWeakness,
      };

      return data;
    }
  };

  useEffect(() => {
    const doRequests = async () => {
      const data = await resquests();

      setPokemonData(data);
    };

    doRequests();
  }, [selectedPokemon]);

  const paddedID = String(pokemon?.pokemonData?.id).padStart(3, "0");
  const totalStats = pokemon?.pokemonData?.stats.reduce(
    (accum, item) => accum + item.base_stat,
    0
  );
  const pokemonHeight = pokemon?.pokemonData?.height
    ? pokemon.pokemonData.height / 10
    : 0;
  const pokemonWeight = pokemon?.pokemonData?.weight
    ? pokemon.pokemonData.weight / 10
    : 0;
  const isGenderLess =
    !pokemon?.pokemonGenderProps?.isFemale &&
    !pokemon?.pokemonGenderProps?.isMale;

  const isNoSelect = !selectedPokemon;
  const isSelectAndLoading =
    selectedPokemon != undefined && !pokemon?.pokemonData;
  const isSelectAndLoaded =
    selectedPokemon != undefined && pokemon?.pokemonData != undefined;
  return (
    <>
      {isNoSelect && <NoSelected />}
      {isSelectAndLoading && <PokemonAsideSkeleton />}
      {isSelectAndLoaded && (
        <>
          <div className={styles.gender}>
            {pokemon?.pokemonGenderProps?.isFemale && (
              <div className={styles.male}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/male.svg"
                  alt="Male Icon"
                />
              </div>
            )}

            {pokemon?.pokemonGenderProps?.isMale && (
              <div className={styles.female}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/female.svg"
                  alt="Female Icon"
                />
              </div>
            )}
            {isGenderLess && (
              <div className={styles.genderLess}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/minus-square.svg"
                  alt="Genderless Icon"
                />
              </div>
            )}
          </div>
          <div className={styles.figure}>
            <Image
              width={120}
              height={120}
              src={`${baseImageUrl}${paddedID}.png`}
              alt={"Pikachu"}
            />
          </div>
          <span className={styles.id}>#{paddedID}</span>
          <h2 className={styles.name}>{pokemon?.pokemonData?.name}</h2>
          <div className={styles.types}>
            {pokemon?.pokemonData?.types.map((type, key) => {
              const [[, backgroundColor]] = Object.entries(
                POKEMONTYPECOLORS
              ).filter(([key, _]) => key === type.type.name);

              return (
                <p
                  style={{
                    color: backgroundColor.medium,
                    background: backgroundColor.light,
                  }}
                  key={key}
                >
                  {type.type.name}
                </p>
              );
            })}
          </div>
          <div className={styles.entry}>
            <h2 className={styles.title}>POKÉDEX ENTRY</h2>
            <p>{pokemon?.pokemonEntry}</p>
          </div>
          <div className={styles.abilities}>
            <h2 className={styles.title}>Abilities</h2>
            <div>
              {pokemon?.pokemonData?.abilities.map((ability, key) => {
                return (
                  <p data-hidden={ability.is_hidden} key={key}>
                    {ability.ability.name}{" "}
                    {ability.is_hidden && (
                      <Image
                        width={14}
                        height={14}
                        src="/icons/eye-slash.svg"
                        alt="Hidden icon"
                      />
                    )}{" "}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.characteristics}>
            <div>
              <h2 className={styles.title}>Height</h2>
              <p>{pokemonHeight}m</p>
            </div>
            <div>
              <h2 className={styles.title}>Weight</h2>
              <p>{pokemonWeight}kg</p>
            </div>
            <div>
              <h2 className={styles.title}>Weakness</h2>
              <p>
                {pokemon?.pokemonWeakness.map((weak, key) => {
                  const [[, backgroundColor]] = Object.entries(
                    POKEMONTYPECOLORS
                  ).filter(([key, _]) => key === weak);

                  return (
                    <span
                      key={key}
                      style={{ background: backgroundColor.medium }}
                    >
                      <Image
                        width={10}
                        height={10}
                        src={`/icons/${weak}.svg`}
                        alt={`${weak} icon`}
                      />
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              <h2 className={styles.title}>Base EXP</h2>
              <p>{pokemon?.pokemonData?.base_experience}</p>
            </div>
          </div>
          <div className={styles.stats}>
            <h2 className={styles.title}>Stats</h2>
            <div>
              {pokemon?.pokemonData?.stats.map((stat, key) => {
                const [[, statAtributtes]] = Object.entries(
                  POKEMONSTATS
                ).filter(([key, _]) => key === stat.stat.name);
                return (
                  <p key={key}>
                    <span style={{ background: statAtributtes.color }}>
                      {statAtributtes.name}
                    </span>
                    {stat.base_stat}
                  </p>
                );
              })}
              <p className={styles.total}>
                <span>tot</span>
                {totalStats}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const NoSelected = () => {
  return (
    <div className={styles.noSelected}>
      <Image
        width={20}
        height={20}
        src="/icons/info-circle.svg"
        alt="Info icon"
      />
      <p>No pokemon selected yet</p>
    </div>
  );
};

export const PokemonAsideSkeleton = () => {
  return (
    <>
      <div className={styles.skeletonFigure}></div>
      <div className={styles.skeletonId}></div>
      <h2 className={styles.skeletonName}></h2>
      <div className={styles.skeletonTypes}>
        <p></p>
        <p></p>
      </div>
      <div className={styles.skeletonAbilities}>
        <h2 className={styles.skeletonTitle}></h2>
        <div>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className={styles.skeletonCharacteristics}>
        <div>
          <h2 className={styles.skeletonTitle}></h2>
          <p></p>
        </div>
        <div>
          <h2 className={styles.skeletonTitle}></h2>
          <p></p>
        </div>
        <div>
          <h2 className={styles.skeletonTitle}></h2>
          <p></p>
        </div>
        <div>
          <h2 className={styles.skeletonTitle}></h2>
          <p></p>
        </div>
      </div>
      <div className={styles.skeletonStats}>
        <h2 className={styles.skeletonTitle}></h2>
        <div>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </>
  );
};
