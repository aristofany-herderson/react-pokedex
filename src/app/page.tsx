import { Aside } from "@/components/layout/aside";
import { PokemonFilters } from "@/components/misc/pokemon-filters";
import { PokemonsLoad } from "@/components/misc/pokemons-load";
import { ScrollTop } from "@/components/misc/scroll-top";
import { GithubIcon } from "@/components/ui/icons/github-icon";
import styles from "@/styles/pages/home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.appWrapper}>
        <main className={styles.main}>
          <PokemonFilters />
          <PokemonsLoad />
        </main>
        <Aside />
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
