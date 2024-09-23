"use client";
import { BASEIMAGEURL, MAXPOKEMONSRENDERED } from "@/services/api";
import styles from "@/styles/error.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Error() {
  const randomID = Math.floor(Math.random() * MAXPOKEMONSRENDERED) + 1;
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <article className={styles.article}>
          <h2>Ops! Something went wrong.</h2>
          <p>
            It looks like a Pokémon used a surprise attack! This page is
            temporarily unavailable. We are working to resolve this as soon as
            possible. Please try again in a few minutes.
          </p>
          <div className={styles.links}>
            <Link href={"/"}>Back to Home</Link>
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href={"https://github.com/aristofany-herderson/react-pokedex/"}
            >
              Visit Project on Github
            </Link>
          </div>
          <p className={styles.message}>
            If the problem persists or if you need additional assistance, please
            do not hesitate to contact us at
            <Link
              target="_blank"
              rel="noreferrer noopener"
              href={"https://github.com/aristofany-herderson/react-pokedex/"}
            >
              github.com
            </Link>
            . We&apos;re here to help train your Pokémon to withstand these
            unexpected attacks!
          </p>
        </article>
        <figure className={styles.figure}>
          <Link href={`/?pokemon=${randomID}`}>
            <Image
              width={600}
              height={600}
              src={`${BASEIMAGEURL}${randomID}.png`}
              alt={`Pokemon with ID ${randomID}`}
            />
          </Link>
        </figure>
      </div>
    </section>
  );
}
