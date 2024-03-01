"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { getAllPokemonData } from "@/services/client-requests";
import { Fragment, useEffect, useState } from "react";
import { baseImageUrl } from "@/services/api";
import { POKEMONTYPECOLORS, POKEMONSTATS } from "@/utils/pokemons";
import { parseAsString, useQueryState } from "nuqs";
import { AsyncReturnType } from "@/@types/async-return-type";
import { toBase64 } from "@/utils/to-base-64";

const pokemonImageLoader = (width: number, height: number) => `
    <svg
      width="${width}"
      height="${height}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 582.75 582"
    >
      <path
        fill="#e9ebf0"
        xmlns="http://www.w3.org/2000/svg"
        d="M165.89,184.89c-6.16-.4-11.88-.51-17.53-1.19-8.63-1-17.35-1.93-25.81-3.85-12.71-2.89-25.36-6.18-37.78-10.1-12.18-3.85-23.29-10.18-33.9-17.29-4.26-2.86-8.58-5.69-12.55-8.93A24.46,24.46,0,0,1,33,137c-2.13-3.59-1.24-5.91,2.82-7.06a54.51,54.51,0,0,1,12.21-2.32c11.19-.53,22.41-1.07,33.59-.71,9.82.31,19.59,2,29.41,2.77,17.69,1.37,34.61,6.42,51.68,10.67,9.46,2.35,19,4.85,28,8.5,6.46,2.62,11.66,1.56,17.62-.91a207.4,207.4,0,0,1,24.86-8.6c5.27-1.44,10.93-1.65,16.45-2,7.31-.48,14.64-.53,22-.82,12.82-.49,25.16,2.24,37.4,5.64,1.64.46,3.48.57,4.91,1.39,3.55,2,5.2.53,7.15-2.53,9.95-15.56,20-31.06,30.34-46.37,3.09-4.57,7.1-8.57,11-12.56q10.88-11.22,22.1-22.13a212.7,212.7,0,0,1,42.36-31.76c5.78-3.35,12-5.91,18.1-8.69A35.62,35.62,0,0,1,450.61,18c-.8,5.3-1.52,10.42-2.36,15.52-3.09,18.61-11,35.45-19.66,51.93a205.55,205.55,0,0,1-24.68,36c-9.1,10.86-18.13,21.79-27.35,32.54-6.37,7.42-13,14.62-19.57,21.84-1.79,2-2.78,3.56-1.54,6.5,4.35,10.39,8.32,20.95,12.34,31.2l66.33-68.28c5,3.33,10.07,6.71,15.17,10,17.09,11,34.37,21.65,51.24,33,8.94,6,17.18,13.06,25.71,19.67,2.91,2.26,5.75,4.6,9.13,7.3-28.82,21.16-58.08,41.06-83.88,65.91,23.66,10.91,48.59,19.11,69.57,36.18-21.36,16.05-46.21,25.7-67.17,42,5.19,2.75,10.51,5.27,15.53,8.29,10.16,6.1,20.18,12.46,30.23,18.76,2.18,1.37,1.79,2.56-.36,3.78-6.93,3.9-13.92,7.73-20.67,11.94q-21.33,13.29-42.43,27c-11.38,7.4-22.51,15.19-33.9,22.59-3.32,2.16-3.52,5.49-3.92,8.54a58.19,58.19,0,0,1-15.27,32.7c-5.3,5.67-3.18,10.42-1.61,15.85,3.21,11.09,6.39,22.26,6.08,33.87-.14,4.86-2.1,9.73-3.61,14.47-.76,2.36-5.9,3.29-9.66,2.15-8.63-2.6-14.85-8.51-20.22-15.31-7.76-9.8-15.15-19.9-22.8-29.79a5.45,5.45,0,0,0-3.17-1.6c-11-1.88-21.95-4-33-5.36-10.16-1.24-20.45-2.35-30.65-2.13-9.14.2-18.31,1.92-27.3,3.78-2.93.6-5.51,3.54-7.95,5.74-15.85,14.29-34.45,23.1-55,28a19.55,19.55,0,0,1-15.3-2.23c-2.14-1.32-2.89-5.58-1.33-8.6,4.64-9,10-17.5,17.41-24.57,6.45-6.13,6.22-6.19,1.38-13.4-3.26-4.87-6.15-10-9.29-14.94-3.47-5.47-4.21-11.72-5-17.88a106.46,106.46,0,0,1-.76-16c.41-12.92,1.64-25.76,4.77-38.34,2.3-9.23,5-18.37,6.94-27.67,1.36-6.6,1.49-13.44,2.52-20.12,1.4-9.07,2.8-18.16,4.86-27.08,1.08-4.71.43-8.33-3-11.47-7.17-6.47-14.82-12.47-21.43-19.45-6.09-6.43-12.28-13.16-14.1-22.42-2.24-11.44-2.29-22.88,3.18-33.4,4.72-9.08,6.59-18.8,8.79-28.57C156.27,205.45,159.7,194.77,165.89,184.89ZM362.36,303.26c.55,3.57.76,6.36,1.43,9,1.85,7.31,3.4,14.74,6,21.8,3.8,10.42,9,20.36,12.47,30.88,5.2,15.86,9.43,32,14,48.09.84,2.92,1.37,5.94,2.15,9.36l36.18-34.79c-3-1.66-5.52-3.26-8.19-4.45-12.47-5.57-25-11-37.47-16.56-5-2.24-5.09-2.95-2.65-8.1a11.63,11.63,0,0,1,1.7-2.82c3.28-3.63,6.68-7.14,10-10.76,6.62-7.3,13.19-14.64,20.42-22.67Z"
      />
    </svg>`;
export const PokemonAside = () => {
  const [pokemon, setPokemonData] = useState<AsyncReturnType<
    typeof getAllPokemonData
  > | null>();
  const [selectedPokemon, setSelectedPokemon] = useQueryState(
    "pokemon",
    parseAsString
  );

  useEffect(() => {
    const getPokemon = async () => {
      if (selectedPokemon) {
        const data = await getAllPokemonData(selectedPokemon);
        return data;
      }
    };

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
  const adjacentPrevPokemonPaddedID = pokemon?.adjacent_pokemons.previous.id
    .toString()
    .padStart(3, "0");
  const adjacentNextPokemonPaddedID = pokemon?.adjacent_pokemons.next.id
    .toString()
    .padStart(3, "0");

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
              src={`${baseImageUrl}${paddedID}.png`}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                pokemonImageLoader(40, 40)
              )}`}
              alt={`${pokemon.name} pokemon image`}
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
                      <span
                        title={weak}
                        key={key}
                        style={{ background: colors.medium }}
                      >
                        <Image
                          width={10}
                          height={10}
                          src={`/icons/pokemon/${weak}.svg`}
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
          <div className={styles.evolutions}>
            <h2 className={styles.title}>Evolution</h2>
            <div>
              {pokemon.evolution.map((evolution, key) => {
                const evolutionPaddedID = evolution.id.padStart(3, "0");
                return (
                  <Fragment key={key}>
                    <Image
                      className={styles.pokemonImage}
                      width={40}
                      height={40}
                      src={`${baseImageUrl}${evolutionPaddedID}.png`}
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        pokemonImageLoader(50, 50)
                      )}`}
                      alt={`${evolution.name} image`}
                    />
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
                src={`${baseImageUrl}${adjacentPrevPokemonPaddedID}.png`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  pokemonImageLoader(50, 50)
                )}`}
                alt="Previous pokemon image"
              />
              <p>{pokemon.adjacent_pokemons.previous.name}</p>
              <span>#{adjacentPrevPokemonPaddedID}</span>
            </button>
            <button
              title={pokemon.adjacent_pokemons.next.name}
              onClick={() => {
                setSelectedPokemon(pokemon.adjacent_pokemons.next.name);
              }}
            >
              <span>#{adjacentNextPokemonPaddedID}</span>
              <p>{pokemon.adjacent_pokemons.next.name}</p>
              <Image
                className={styles.pokemonImage}
                width={18}
                height={18}
                src={`${baseImageUrl}${adjacentNextPokemonPaddedID}.png`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  pokemonImageLoader(50, 50)
                )}`}
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

export const NoSelected = () => {
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
      <div className={styles.skeletonNextPrevPokemons}></div>
    </>
  );
};
