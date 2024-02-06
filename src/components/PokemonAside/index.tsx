"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { PokemonType } from "@/@types/PokemonType";
import { useEffect, useState } from "react";
import { getPokemonByNameOrID } from "@/services/clientRequests";
import { baseImageUrl } from "@/services/api";
import { POKEMONSTATS, POKEMONTYPECOLORS } from "@/utils/pokemons";

export const PokemonAside = () => {
  const searchParams = useSearchParams();
  const selectedPokemon = searchParams.get("selected");
  const [pokemon, setPokemon] = useState<PokemonType>();

  useEffect(() => {
    if (selectedPokemon != null && selectedPokemon?.trim() != "") {
      getPokemonByNameOrID(selectedPokemon).then((res) => {
        setPokemon(res);
      });
    }
  }, [selectedPokemon]);

  const paddedID = String(pokemon?.id).padStart(3, "0");
  var totalStats = pokemon?.stats.reduce(
    (accum, item) => accum + item.base_stat,
    0
  );

  return (
    <>
      {selectedPokemon != null && selectedPokemon?.trim() != "" ? (
        <>
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
          <div className={styles.abilities}>
            <h2 className={styles.title}>Abilities</h2>
            <div>
              {pokemon?.abilities.map(({ ability }, key) => {
                return <p key={key}>{ability.name}</p>;
              })}
            </div>
          </div>
          <div className={styles.characteristics}>
            <div>
              <h2 className={styles.title}>Height</h2>
              <p>{pokemon?.height}</p>
            </div>
            <div>
              <h2 className={styles.title}>Weight</h2>
              <p>{pokemon?.weight}</p>
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
