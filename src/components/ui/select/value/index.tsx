import { SelectionPokemonRange } from "@/@types/select-pokemon-range";
import { StarIcon } from "@/components/ui/icons/star-icon";
import { SELECTLEVELCOLORS } from "@/utils/selects-data";
import classNames from "classnames";
import { forwardRef } from "react";
import { SingleValueProps } from "react-select";
import { SelectionData } from "../";
import { FilterIcon } from "../../icons/filter-icon";
import styles from "./styles.module.scss";

import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import { POKEMONTYPEICONS } from "@/utils/pokemon-type-icons";

export const TypeValue = forwardRef<HTMLDivElement, SingleValueProps>(
  ({ data, className, innerProps }, ref) => {
    const currentData = data as SelectionData;
    const currentDataValue = currentData.value as PokemonPossibleTypes;
    const colors = POKEMONTYPECOLORS[currentDataValue];

    return (
      <div className={classNames(styles.value, className)} {...innerProps}>
        <span
          style={{
            ["--colors-background" as any]: colors.medium,
          }}
        >
          {POKEMONTYPEICONS[currentDataValue]}
        </span>
        <p
          style={{
            ["--colors-color" as any]: colors.medium,
          }}
        >
          {currentData.label}
        </p>
      </div>
    );
  }
);

TypeValue.displayName = "TypeValue";

export const AbilityValue = forwardRef<HTMLDivElement, SingleValueProps>(
  ({ data, className, innerProps }, ref) => {
    const currentData = data as SelectionData;

    return (
      <div
        className={classNames(styles.abilityValue, className)}
        {...innerProps}
        ref={ref}
      >
        <span>
          <StarIcon width={10} height={10} />
        </span>
        <p>{currentData.label}</p>
      </div>
    );
  }
);

AbilityValue.displayName = "AbilityValue";

export const OrderValue = forwardRef<HTMLDivElement, SingleValueProps>(
  ({ data, className, innerProps }, ref) => {
    const currentData = data as SelectionData;

    return (
      <div className={classNames(styles.value, className)} {...innerProps}>
        <p className={styles.order}>{currentData.label}</p>
      </div>
    );
  }
);

OrderValue.displayName = "OrderValue";

export const NumberValue = forwardRef<HTMLDivElement, SingleValueProps>(
  ({ data, className, innerProps }, ref) => {
    const currentData = data as SelectionPokemonRange;
    const color = SELECTLEVELCOLORS[currentData.value];

    return (
      <div className={classNames(styles.value, className)} {...innerProps}>
        <span style={{ background: color }}>
          <FilterIcon width={10} height={10} />
        </span>
        <p>{currentData.label}</p>
      </div>
    );
  }
);

NumberValue.displayName = "NumberValue";
