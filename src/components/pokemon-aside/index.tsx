"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { getAllPokemonData } from "@/services/client-requests";
import { useEffect, useState } from "react";
import { baseImageUrl } from "@/services/api";
import { POKEMONTYPECOLORS, POKEMONSTATS } from "@/utils/pokemons";
import { useQueryState } from "nuqs";
import { AsyncReturnType } from "@/@types/async-return-type";

export const PokemonAside = () => {
  const [pokemon, setPokemonData] = useState<AsyncReturnType<
    typeof getAllPokemonData
  > | null>();
  const [selectedPokemon, _] = useQueryState("pokemon");

  const getPokemon = async () => {
    if (selectedPokemon) {
      const data = await getAllPokemonData(selectedPokemon);
      return data;
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon();

      setPokemonData(data);
    };

    fetchPokemon();
  }, [selectedPokemon]);

  const paddedID = String(pokemon?.id).padStart(3, "0");
  const totalStats = pokemon?.stats.reduce(
    (accum, item) => accum + item.base_stat,
    0
  );
  const pokemonHeight = pokemon?.height ? pokemon.height / 10 : 0;
  const pokemonWeight = pokemon?.weight ? pokemon.weight / 10 : 0;
  const isGenderLess = !pokemon?.gender.isFemale && !pokemon?.gender.isMale;

  const isNoSelect = !selectedPokemon;
  const isSelectAndLoading =
    selectedPokemon != undefined && pokemon?.name != selectedPokemon;
  const isSelectAndLoaded =
    selectedPokemon != undefined && pokemon?.name == selectedPokemon;
  return (
    <>
      {isNoSelect && <NoSelected />}
      {isSelectAndLoading && <PokemonAsideSkeleton />}
      {isSelectAndLoaded && (
        <>
          <div className={styles.gender}>
            {pokemon?.gender.isFemale && (
              <div className={styles.male}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/male.svg"
                  alt="Male Icon"
                />
              </div>
            )}
            {pokemon?.gender.isMale && (
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
              alt={`${pokemon.name} image`}
              blurDataURL={`${baseImageUrl}${paddedID}.png`}
              placeholder="blur"
            />
          </div>
          <span className={styles.id}>#{paddedID}</span>
          <h2 className={styles.name}>{pokemon?.name}</h2>
          <div className={styles.types}>
            {pokemon?.types.map((type, key) => {
              const colors = (POKEMONTYPECOLORS as any)[type.type.name];

              return (
                <p
                  style={{
                    color: colors.medium,
                    background: colors.light,
                  }}
                  key={key}
                >
                  {type.type.name}
                </p>
              );
            })}
          </div>
          {pokemon.entry != "" && (
            <div className={styles.entry}>
              <h2 className={styles.title}>POKÉDEX ENTRY</h2>
              <p>{pokemon?.entry.replace("\f", " ")}</p>
            </div>
          )}
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
              {pokemon.weakness.length != 0 ? (
                <p>
                  {pokemon?.weakness.map((weak, key) => {
                    const colors = (POKEMONTYPECOLORS as any)[weak];

                    return (
                      <span key={key} style={{ background: colors.medium }}>
                        <Image
                          width={10}
                          height={10}
                          src={`/icons/pokemon/${weak}.svg`}
                          alt={`${weak} icon`}
                        />
                      </span>
                    );
                  })}
                </p>
              ) : (
                <p className={styles.noData}>no weakness</p>
              )}
            </div>
            <div>
              <h2 className={styles.title}>Base EXP</h2>
              {pokemon.base_experience ? (
                <p>{pokemon?.base_experience}</p>
              ) : (
                <p className={styles.noData}>no data</p>
              )}
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
          <div className={styles.nextPrevPokemons}>
            <button>
              <Image width={10} height={10} src="/icons/chevron-left.svg" alt="icons" />
              <Image width={16} height={16} src={`${baseImageUrl}${pokemon.id.toString().padStart(3, "0")}.png`} alt="pokemon" />
              <p>Pikachu</p>
              <span>#002</span>
            </button>
            <button>
              <Image width={16} height={16} src={`${baseImageUrl}${pokemon.id.toString().padStart(3, "0")}.png`} alt="pokemon" />
              <p>Pikachu</p>
              <span>#004</span>
              <Image width={10} height={10} src="/icons/chevron-left.svg" alt="icons" />
            </button>
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
      <div className={styles.skeletonGender}>
        <p></p>
        <p></p>
      </div>
      <div className={styles.skeletonFigure}></div>
      <div className={styles.skeletonId}></div>
      <h2 className={styles.skeletonName}></h2>
      <div className={styles.skeletonTypes}>
        <p></p>
        <p></p>
      </div>
      <div className={styles.skeletonEntry}>
        <h2 className={styles.skeletonTitle}></h2>
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
