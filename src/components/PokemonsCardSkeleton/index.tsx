import styles from "./styles.module.scss";

export const PokemonCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.figure}></div>
      <div className={styles.name}></div>
      <div className={styles.types}></div>
    </div>
  );
};
