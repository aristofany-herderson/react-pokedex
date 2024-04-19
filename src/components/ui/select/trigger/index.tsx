import classNames from "classnames";
import { forwardRef } from "react";
import { ControlProps } from "react-select";
import styles from './styles.module.scss';

export const Trigger = forwardRef<HTMLDivElement, ControlProps>(
  ({ children, className, innerProps }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.trigger, className)}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

Trigger.displayName = "Trigger";

export const TransparentTrigger = forwardRef<HTMLDivElement, ControlProps>(
  ({ children, className, innerProps }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.transparentTrigger, className)}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

TransparentTrigger.displayName = "TransparentTrigger";
