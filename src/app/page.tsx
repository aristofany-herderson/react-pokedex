"use client";
import { Aside } from "@/components/layout/aside";
import { PokemonFilters } from "@/components/misc/pokemon-filters";
import { PokemonsLoad } from "@/components/misc/pokemons-load";
import { ScrollTop } from "@/components/misc/scroll-top";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import styles from "@/styles/pages/home.module.scss";
import { useIsFirstRender, useToggle } from "@uidotdev/usehooks";
import Link from "next/link";

export default function Home() {
  const isFirstRender = useIsFirstRender();
  const [isAsideOpen, toggle] = useToggle(false);

  return (
    <>
      <div className={styles.appWrapper}>
        <main className={styles.main}>
          <PokemonFilters />
          <PokemonsLoad toggleAsideIsOpen={toggle} />
        </main>
        <Aside toggleAsideIsOpen={toggle} isOpen={isAsideOpen} isFirstRender={isFirstRender} />
      </div>
      <Link
        className={styles.githubLink}
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/aristofany-herderson/react-pokedex/"
      >
        <GithubIcon width={32} height={32} />
      </Link>
      <ScrollTop />
    </>
  );
}
