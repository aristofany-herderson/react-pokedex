"use client";
import { AsyncReturnType } from "@/@types/async-return-type";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { getAllPokemonData } from "@/services/requests";
import { pokemonSVGLoader } from "@/utils/pokemon-image-loader";
import { pokemonImageURL } from "@/utils/pokemon-image-url";
import { POKEMONSTATCOLORS, POKEMONTYPECOLORS } from "@/utils/pokemons";
import classNames from "classnames";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const Aside = () => {
  const [pokemon, setPokemon] = useState<AsyncReturnType<
    typeof getAllPokemonData
  > | null>();
  const { pokemon: selectedPokemon, setPokemon: setSelectedPokemon } =
    usePokemonQueryParams();

  useEffect(() => {
    const getPokemon = async () => {
      if (selectedPokemon) {
        const data = await getAllPokemonData(selectedPokemon);
        return data;
      }
    };

    const fetchPokemon = async () => {
      const data = await getPokemon();

      setPokemon(data);
    };

    fetchPokemon();
  }, [selectedPokemon]);

  const paddedID = String(pokemon?.id).padStart(3, "0");
  const sumStats = pokemon?.stats.reduce((accum, item) => {
    return accum + item.base_stat;
  }, 0);
  const height = (pokemon?.height || 0) / 10;
  const weight = (pokemon?.weight || 0) / 10;
  const isGenderLess = !pokemon?.gender.isFemale && !pokemon?.gender.isMale;

  const prevPokemonPaddedID = String(
    pokemon?.adjacent_pokemons.previous.id
  ).padStart(3, "0");
  const nextPokemonPaddedID = String(
    pokemon?.adjacent_pokemons.next.id
  ).padStart(3, "0");

  const isNoSelect = !selectedPokemon;
  const isSelectAndLoading =
    selectedPokemon != undefined &&
    String(selectedPokemon)?.trim() != "" &&
    pokemon?.name != selectedPokemon;
  const isSelectAndLoaded =
    selectedPokemon != undefined &&
    String(selectedPokemon)?.trim() != "" &&
    pokemon?.name == selectedPokemon;

  return (
    <aside className={styles.aside}>
      {isNoSelect && <NoPokemonSelected />}
      {isSelectAndLoading && <AsideSkeleton />}
      {isSelectAndLoaded && (
        <>
          <div className={styles.gender}>
            {pokemon?.gender.isFemale && (
              <div className={styles.male}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/male.svg"
                  alt="Icon for male pokemon"
                />
              </div>
            )}
            {pokemon?.gender.isMale && (
              <div className={styles.female}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/female.svg"
                  alt="Icon for female pokemon"
                />
              </div>
            )}
            {isGenderLess && (
              <div className={styles.genderLess}>
                <Image
                  width={20}
                  height={20}
                  src="/icons/minus-square.svg"
                  alt="Icon for genderless pokemon"
                />
              </div>
            )}
          </div>
          <div className={styles.figure}>
            <Image
              width={120}
              height={120}
              src={pokemonImageURL(pokemon.id)}
              priority
              placeholder={pokemonSVGLoader(40, 40)}
              alt={`${pokemon.name} pokemon image`}
            />
          </div>
          <span className={styles.id}>#{paddedID}</span>
          <h2
            className={classNames(
              styles.name,
              pokemon.is_legendary && styles.legendary
            )}
          >
            {pokemon?.name}
          </h2>
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
          {pokemon.entry && (
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
                    {ability.ability.name}
                    {ability.is_hidden && (
                      <Image
                        width={14}
                        height={14}
                        src="/icons/eye-slash.svg"
                        alt="Icon for hidden ability"
                      />
                    )}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.characteristics}>
            <div>
              <h2 className={styles.title}>Height</h2>
              <p>{height}m</p>
            </div>
            <div>
              <h2 className={styles.title}>Weight</h2>
              <p>{weight}kg</p>
            </div>
            <div>
              <h2 className={styles.title}>Weakness</h2>
              {pokemon.weakness.length != 0 ? (
                <p>
                  {pokemon?.weakness.map((weak, key) => {
                    const colors = (POKEMONTYPECOLORS as any)[weak];

                    return (
                      <span
                        title={weak}
                        key={key}
                        style={{ background: colors.medium }}
                      >
                        <Image
                          width={10}
                          height={10}
                          src={`/icons/pokemon-types/${weak}.svg`}
                          alt={`Pokemon ${weak} weakness icon`}
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
                  POKEMONSTATCOLORS
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
                {sumStats}
              </p>
            </div>
          </div>
          <div className={styles.evolutions}>
            <h2 className={styles.title}>Evolution</h2>
            <div>
              {pokemon.evolution.map((evolution, key) => {
                const evolutionPaddedID = String(evolution.id).padStart(3, "0");

                return (
                  <Fragment key={key}>
                    <button
                      onClick={() => {
                        setSelectedPokemon(evolution.name);
                      }}
                      aria-label={`select ${evolution.name}`}
                    >
                      <Image
                        className={styles.pokemonImage}
                        width={40}
                        height={40}
                        src={pokemonImageURL(evolution.id)}
                        placeholder={pokemonSVGLoader(40, 40)}
                        alt={`${evolution.name} image`}
                      />
                    </button>
                    {evolution.level >= 0 && <p>Lvl {evolution.level}</p>}
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className={styles.nextPrevPokemons}>
            <button
              title={pokemon.adjacent_pokemons.previous.name}
              onClick={() => {
                setSelectedPokemon(pokemon.adjacent_pokemons.previous.name);
              }}
            >
              <Image
                width={10}
                height={10}
                src="/icons/chevron-left.svg"
                alt="Previous pokemon chevron icon"
              />
              <Image
                className={styles.pokemonImage}
                width={18}
                height={18}
                src={pokemonImageURL(pokemon.adjacent_pokemons.previous.id)}
                placeholder={pokemonSVGLoader(40, 40)}
                alt="Previous pokemon image"
              />
              <p>{pokemon.adjacent_pokemons.previous.name}</p>
              <span>#{prevPokemonPaddedID}</span>
            </button>
            <button
              title={pokemon.adjacent_pokemons.next.name}
              onClick={() => {
                setSelectedPokemon(pokemon.adjacent_pokemons.next.name);
              }}
            >
              <span>#{nextPokemonPaddedID}</span>
              <p>{pokemon.adjacent_pokemons.next.name}</p>
              <Image
                className={styles.pokemonImage}
                width={18}
                height={18}
                src={pokemonImageURL(pokemon.adjacent_pokemons.next.id)}
                placeholder={pokemonSVGLoader(40, 40)}
                alt="Next pokemon chevron icon"
              />
              <Image
                width={10}
                height={10}
                src="/icons/chevron-right.svg"
                alt="Next pokemon image"
              />
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

const NoPokemonSelected = () => {
  return (
    <div className={styles.noSelected}>
      <Image
        width={20}
        height={20}
        src="/icons/info-circle.svg"
        alt="Icon for no selected pokemon"
      />
      <p>No pokemon selected yet</p>
    </div>
  );
};

const AsideSkeleton = () => {
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
      <div className={styles.skeletonEvolutions}>
        <h2 className={styles.skeletonTitle}></h2>
        <div className={styles.skeletonEvolutionsWrapper}>
          <div></div>
          <p></p>
          <div></div>
          <p></p>
          <div></div>
        </div>
      </div>
      <div className={styles.skeletonNextPrevPokemons}></div>
    </>
  );
};
