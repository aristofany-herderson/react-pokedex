import { Aside } from "@/components/aside";
import { PokemonFilters } from "@/components/pokemon-filters";
import { PokemonsLoad } from "@/components/pokemons-load";
import { ScrollTop } from "@/components/scrollTop";
import styles from "@/styles/pages/home.module.scss";
import Image from "next/image";
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
        <Image
          width={26}
          height={26}
          src="/icons/github.svg"
          alt="Github icon"
        />
      </Link>
      <ScrollTop />
    </>
  );
}
