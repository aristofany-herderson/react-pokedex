"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { PokemonType } from "@/@types/PokemonType";
import { useEffect, useState } from "react";
import {
  getPokemonByNameOrID,
  getPokemonEntry,
  getPokemonGender,
} from "@/services/clientRequests";
import { baseImageUrl } from "@/services/api";
import { POKEMONSTATS, POKEMONTYPECOLORS } from "@/utils/pokemons";

export const PokemonAside = () => {
  const searchParams = useSearchParams();
  const selectedPokemonName = searchParams.get("selected");
  const [pokemon, setPokemon] = useState<PokemonType>();
  const [pokemonEntry, setPokemonEntry] = useState("");
  const [pokemonGender, setPokemonGender] = useState<{
    isMale: boolean;
    isFemale: boolean;
  }>();

  useEffect(() => {
    if (selectedPokemonName != null && selectedPokemonName?.trim() != "") {
      getPokemonByNameOrID(selectedPokemonName).then((pokemonData) => {
        setPokemon(pokemonData);
      });

      getPokemonEntry(selectedPokemonName).then((entry) => {
        setPokemonEntry(entry.replace("\f", " "));
      });

      getPokemonGender(selectedPokemonName).then((gender) => {
        setPokemonGender(gender);
      });
    }
  }, [selectedPokemonName]);

  const paddedID = String(pokemon?.id).padStart(3, "0");
  const totalStats = pokemon?.stats.reduce(
    (accum, item) => accum + item.base_stat,
    0
  );
  const pokemonHeight = pokemon?.height ? pokemon.height / 10 : 0;
  const pokemonWeight = pokemon?.weight ? pokemon.weight / 10 : 0;
  const isGenderLess = !pokemonGender?.isFemale && !pokemonGender?.isMale;
  return (
    <>
      {selectedPokemonName != null && selectedPokemonName?.trim() != "" ? (
        <>
          <div className={styles.gender}>
            {pokemonGender?.isFemale && (
              <div className={styles.male}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/male.svg"
                  alt="Male Icon"
                />
              </div>
            )}

            {pokemonGender?.isMale && (
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
          <h2 className={styles.name}>{pokemon?.name}</h2>
          <div className={styles.types}>
            {pokemon?.types.map((type, key) => {
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
            <p dangerouslySetInnerHTML={{ __html: pokemonEntry }}></p>
          </div>
          <div className={styles.abilities}>
            <h2 className={styles.title}>Abilities</h2>
            <div>
              {pokemon?.abilities.map((ability, key) => {
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
              <p>asasdsd</p>
            </div>
            <div>
              <h2 className={styles.title}>Base EXP</h2>
              <p>{pokemon?.base_experience}</p>
            </div>
          </div>
          <div className={styles.stats}>
            <h2 className={styles.title}>Stats</h2>
            <div>
              {pokemon?.stats.map((stat, key) => {
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
      ) : (
        <div className={styles.noSelected}>
          <Image
            width={20}
            height={20}
            src="/icons/info-circle.svg"
            alt="Info icon"
          />
          <p>No pokemon selected yet</p>
        </div>
      )}
    </>
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
