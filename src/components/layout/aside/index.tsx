"use client";

import { AsyncReturnType } from "@/@types/async-return-type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronLeftIcon } from "@/components/ui/icons/chevron-left-icon";
import { ChevronRightIcon } from "@/components/ui/icons/chevron-right-icon";
import { EyeSlashIcon } from "@/components/ui/icons/eye-slash-icon";
import { FemaleIcon } from "@/components/ui/icons/female-icon";
import { MaleIcon } from "@/components/ui/icons/male-icon";
import { MinusSquareIcon } from "@/components/ui/icons/minus-square-icon";
import { PanelOpenIcon } from "@/components/ui/icons/panel-open";
import { useApp } from "@/contexts/app-context";
import { usePokemonQueryParams } from "@/hooks/use-pokemon-query-params";
import { getPokemonData } from "@/services/requests";
import { padId } from "@/utils/pad-id";
import { pokemonImagePlaceholder } from "@/utils/pokemon-image-placeholder";
import { POKEMONSTATS } from "@/utils/pokemon-stats";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import { POKEMONTYPEICONS } from "@/utils/pokemon-type-icons";
import { removeSpecialCharacters } from "@/utils/remove-special-characters";
import classNames from "classnames";
import Image from "next/image";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import { Loading } from "./states/loading";
import { NoPokemonSelected } from "./states/no-pokemon-selected";
import styles from "./styles.module.scss";

export const Aside = () => {
  const { isAsideOpen, setOrToggleIsAsideOpen } = useApp();
  const { pokemon: selectedPokemon, setPokemon: setSelectedPokemon } =
    usePokemonQueryParams();

  const [pokemon, setPokemon] = useState<AsyncReturnType<
    typeof getPokemonData
  > | null>();

  const paddedID = padId(pokemon?.id);
  const sumStats = pokemon?.stats.reduce(
    (accum, item) => accum + item.base_stat,
    0
  );
  const height = (pokemon?.height || 0) / 10;
  const weight = (pokemon?.weight || 0) / 10;
  const isGenderLess = !pokemon?.gender.isFemale && !pokemon?.gender.isMale;
  const prevPokemonPaddedID = padId(pokemon?.adjacent_pokemons.previous.id);
  const nextPokemonPaddedID = padId(pokemon?.adjacent_pokemons.next.id);

  const isNoSelect = !selectedPokemon;
  const isSelectAndLoading = selectedPokemon && pokemon?.id !== selectedPokemon;
  const isSelectAndLoaded = selectedPokemon && pokemon?.id === selectedPokemon;

  useEffect(() => {
    const getPokemon = async () => {
      if (!selectedPokemon) return null;
      return await getPokemonData(selectedPokemon);
    };

    const fetchPokemon = async () => {
      setPokemon(await getPokemon());
    };

    if (selectedPokemon) setOrToggleIsAsideOpen(true);

    fetchPokemon();
  }, [selectedPokemon, setOrToggleIsAsideOpen]);

  return (
    <Fragment>
      <button
        aria-label="Open aside"
        data-state={isAsideOpen ? "opened" : "closed"}
        onClick={() => setOrToggleIsAsideOpen()}
        className={styles.openAsideButton}
      >
        <PanelOpenIcon width={14} height={14} />
      </button>
      <aside
        data-state={isAsideOpen ? "opened" : "closed"}
        className={styles.aside}
      >
        <div
          onClick={() => setOrToggleIsAsideOpen(false)}
          className={styles.asideBackground}
        />

        {isNoSelect && <NoPokemonSelected />}
        {isSelectAndLoading && <Loading />}

        {isSelectAndLoaded && (
          <div className={styles.wrapper}>
            <div className={styles.gender}>
              {pokemon?.gender.isFemale && (
                <div className={styles.male}>
                  <MaleIcon />
                </div>
              )}
              {pokemon?.gender.isMale && (
                <div className={styles.female}>
                  <FemaleIcon />
                </div>
              )}
              {isGenderLess && (
                <div className={styles.genderLess}>
                  <MinusSquareIcon />
                </div>
              )}
            </div>

            <div className={styles.figure}>
              <Image
                width={140}
                height={140}
                src={pokemon.sprite}
                priority
                placeholder={pokemonImagePlaceholder(40, 40)}
                alt={`artwork of ${pokemon.name}`}
              />
            </div>

            <p className={styles.id}>#{paddedID}</p>

            <h2
              className={classNames(
                styles.name,
                pokemon.is_legendary && styles.legendary
              )}
            >
              {pokemon?.name}
            </h2>

            <div className={styles.types}>
              {pokemon?.types.map(({ type: { name } }, key) => {
                const colors = POKEMONTYPECOLORS[name];

                return (
                  <p
                    key={key}
                    style={
                      {
                        "--colors-color": colors.medium,
                        "--colors-background": colors.light,
                      } as CSSProperties
                    }
                  >
                    {name}
                  </p>
                );
              })}
            </div>

            {pokemon?.entry && (
              <div className={styles.entry}>
                <h2 className={styles.title}>POKÉDEX ENTRY</h2>
                <p>{removeSpecialCharacters(pokemon.entry)}</p>
              </div>
            )}

            <div className={styles.abilities}>
              <h2 className={styles.title}>Abilities</h2>
              <div>
                {pokemon?.abilities.map((ability, key) => (
                  <HoverCard openDelay={100} closeDelay={0} key={key}>
                    <HoverCardTrigger>
                      <p key={key} data-hidden={ability.is_hidden}>
                        {ability.name}
                        {ability.is_hidden && (
                          <EyeSlashIcon width={18} height={18} />
                        )}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" asChild>
                      <div
                        data-hidden={ability.is_hidden}
                        className={styles.abilitiesHoverCard}
                      >
                        <div className={styles.type}>
                          {ability.is_hidden ? "hidden" : "shown"}
                        </div>
                        <h2>{ability.name}</h2>
                        <div className={styles.divider} />
                        <p>
                          <span>Description: </span>
                          {ability.entry}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
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
                {pokemon.weakness.length !== 0 ? (
                  <div className={styles.weakness}>
                    {pokemon?.weakness.map((weak, key) => {
                      const colors = POKEMONTYPECOLORS[weak];

                      return (
                        <HoverCard openDelay={100} closeDelay={0} key={key}>
                          <HoverCardContent side="top">
                            <div
                              className={styles.weaknessHoverCard}
                              style={
                                {
                                  "--colors-background": colors.medium,
                                } as CSSProperties
                              }
                            >
                              <span
                                style={
                                  {
                                    "--colors-color": colors.medium,
                                  } as CSSProperties
                                }
                                key={key}
                              >
                                {POKEMONTYPEICONS[weak]}
                              </span>
                              {weak}
                            </div>
                          </HoverCardContent>
                          <HoverCardTrigger>
                            <span
                              key={key}
                              style={
                                {
                                  "--colors-background": colors.medium,
                                } as CSSProperties
                              }
                            >
                              {POKEMONTYPEICONS[weak]}
                            </span>
                          </HoverCardTrigger>
                        </HoverCard>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.noData}>no weakness</p>
                )}
              </div>
              <div>
                <h2 className={styles.title}>Base EXP</h2>
                <p>{pokemon.base_experience || "no data"}</p>
              </div>
            </div>

            <div className={styles.stats}>
              <h2 className={styles.title}>Stats</h2>
              <div>
                {pokemon?.stats.map((stat, key) => {
                  const { color, name } = POKEMONSTATS[stat.stat.name];
                  return (
                    <p key={key}>
                      <span style={{ background: color }}>{name}</span>
                      {stat.base_stat}
                    </p>
                  );
                })}
                <p className={styles.total}>
                  <span>TOT</span>
                  {sumStats}
                </p>
              </div>
            </div>

            <div className={styles.evolutions}>
              <h2 className={styles.title}>Evolution</h2>
              <div>
                {pokemon.evolution.map((evolutions, index) => (
                  <Fragment key={index}>
                    {evolutions.map(
                      (evolution, key) =>
                        evolution && (
                          <button
                            key={key}
                            onClick={() => setSelectedPokemon(evolution.id)}
                            aria-label={`select ${evolution.name}`}
                          >
                            <Image
                              className={styles.pokemonImage}
                              width={40}
                              height={40}
                              src={evolution.sprite}
                              placeholder={pokemonImagePlaceholder(40, 40)}
                              alt={`${evolution.name} image`}
                            />
                          </button>
                        )
                    )}
                    {index != pokemon.evolution.length - 1 && evolutions[0] && (
                      <p>Lvl {evolutions[0].level}</p>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className={styles.nextPrevPokemons}>
              <HoverCard openDelay={100} closeDelay={0}>
                <HoverCardContent side="top">
                  <div className={styles.nextProvPokemonHoverCard}>
                    <p>{pokemon.adjacent_pokemons.previous.name}</p>
                  </div>
                </HoverCardContent>
                <HoverCardTrigger asChild>
                  <button
                    className={styles.prev}
                    onClick={() =>
                      setSelectedPokemon(pokemon.adjacent_pokemons.previous.id)
                    }
                  >
                    <ChevronLeftIcon width={12} height={12} />
                    <Image
                      className={styles.pokemonImage}
                      width={18}
                      height={18}
                      src={pokemon.adjacent_pokemons.previous.sprite}
                      placeholder={pokemonImagePlaceholder(40, 40)}
                      alt="Previous pokemon image"
                    />
                    <p>{pokemon.adjacent_pokemons.previous.name}</p>
                    <span>#{prevPokemonPaddedID}</span>
                  </button>
                </HoverCardTrigger>
              </HoverCard>
              <HoverCard openDelay={100} closeDelay={0}>
                <HoverCardContent>
                  <div className={styles.nextProvPokemonHoverCard}>
                    <p>{pokemon.adjacent_pokemons.next.name}</p>
                  </div>
                </HoverCardContent>
                <HoverCardTrigger asChild>
                  <button
                    className={styles.next}
                    onClick={() =>
                      setSelectedPokemon(pokemon.adjacent_pokemons.next.id)
                    }
                  >
                    <span>#{nextPokemonPaddedID}</span>
                    <p>{pokemon.adjacent_pokemons.next.name}</p>
                    <Image
                      className={styles.pokemonImage}
                      width={18}
                      height={18}
                      src={pokemon.adjacent_pokemons.next.sprite}
                      placeholder={pokemonImagePlaceholder(40, 40)}
                      alt="Next pokemon chevron icon"
                    />
                    <ChevronRightIcon width={12} height={12} />
                  </button>
                </HoverCardTrigger>
              </HoverCard>
            </div>
          </div>
        )}
      </aside>
    </Fragment>
  );
};
