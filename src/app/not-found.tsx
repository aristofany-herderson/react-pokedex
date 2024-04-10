import styles from "@/styles/not-found.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={styles.notFoundWrapper}>
      <div className={styles.wrapper}>
        <h2>404</h2>
        <p>
          <b>Not found,</b> <br /> Sorry, we were unable to find that page
          <span> Please, navigate to home</span>
        </p>
        <Link href="/">Navigate to home</Link>
      </div>
    </section>
  );
}
