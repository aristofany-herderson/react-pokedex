import classNames from "classnames";
import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.gender}>
        <p className={styles.loadingAnimate}></p>
        <p className={styles.loadingAnimate}></p>
      </div>
      <div className={classNames(styles.figure, styles.loadingAnimate)}></div>
      <div className={classNames(styles.id, styles.loadingAnimate)}></div>
      <h2 className={classNames(styles.name, styles.loadingAnimate)}></h2>
      <div className={styles.types}>
        <p className={styles.loadingAnimate}></p>
        <p className={styles.loadingAnimate}></p>
      </div>
      <div className={styles.entry}>
        <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
        <p className={styles.loadingAnimate}></p>
      </div>
      <div className={styles.abilities}>
        <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
        <div>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
        </div>
      </div>
      <div className={styles.characteristics}>
        <div>
          <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
          <p className={styles.loadingAnimate}></p>
        </div>
        <div>
          <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
          <p className={styles.loadingAnimate}></p>
        </div>
        <div>
          <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
          <p className={styles.loadingAnimate}></p>
        </div>
        <div>
          <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
          <p className={styles.loadingAnimate}></p>
        </div>
      </div>
      <div className={styles.stats}>
        <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
        <div>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
          <p className={styles.loadingAnimate}></p>
        </div>
      </div>
      <div className={styles.evolutions}>
        <h2 className={classNames(styles.title, styles.loadingAnimate)}></h2>
        <div className={styles.evolutionsWrapper}>
          <div className={styles.loadingAnimate}></div>
          <p className={styles.loadingAnimate}></p>
          <div className={styles.loadingAnimate}></div>
          <p className={styles.loadingAnimate}></p>
          <div className={styles.loadingAnimate}></div>
        </div>
      </div>
      <div
        className={classNames(styles.nextPrevPokemons, styles.loadingAnimate)}
      ></div>
    </div>
  );
};
