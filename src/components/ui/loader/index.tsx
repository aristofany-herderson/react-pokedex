import classNames from "classnames";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

type LoaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={classNames(styles.loader, className)}
        ref={ref}
        {...props}
      >
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    );
  }
);

Loader.displayName = "Loader";
