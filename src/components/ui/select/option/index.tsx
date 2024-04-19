import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { SelectionPokemonRange } from "@/@types/select-pokemon-range";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import { POKEMONTYPEICONS } from "@/utils/pokemon-type-icons";
import { SELECTLEVELCOLORS } from "@/utils/selects-data";
import classNames from "classnames";
import { forwardRef } from "react";
import { OptionProps } from "react-select";
import { SelectionData } from "../";
import { FilterIcon } from "../../icons/filter-icon";
import { StarIcon } from "../../icons/star-icon";
import styles from "./styles.module.scss";

export const TypeOption = forwardRef<HTMLDivElement, OptionProps>(
  ({ data, isFocused, isSelected, className, innerProps }, ref) => {
    const currentData = data as SelectionData;
    const currentDataValue = currentData.value as PokemonPossibleTypes;
    const colors = POKEMONTYPECOLORS[currentDataValue];

    return (
      <div
        className={classNames(
          styles.option,
          isFocused && styles.optionFocus,
          isSelected && styles.optionSelected,
          className
        )}
        ref={ref}
        {...innerProps}
      >
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

TypeOption.displayName = "TypeOption";

export const AbilityOption = forwardRef<HTMLDivElement, OptionProps>(
  ({ data, isFocused, isSelected, className, innerProps }, ref) => {
    const currentData = data as SelectionData;

    return (
      <div
        className={classNames(
          styles.optionFull,
          isFocused && styles.optionFocus,
          isSelected && styles.optionSelected,
          className
        )}
        ref={ref}
        {...innerProps}
      >
        <span style={{ background: "var(--colors-yellow)" }}>
          <StarIcon width={10} height={10} />
        </span>
        <p>{currentData.label}</p>
      </div>
    );
  }
);

AbilityOption.displayName = "AbilityOption";

export const OrderOption = forwardRef<HTMLDivElement, OptionProps>(
  ({ data, isFocused, isSelected, className, innerProps }, ref) => {
    const currentData = data as SelectionData;

    return (
      <div
        className={classNames(
          styles.optionFull,
          isFocused && styles.optionFocus,
          isSelected && styles.optionSelected,
          className
        )}
        ref={ref}
        {...innerProps}
      >
        <p>{currentData.label}</p>
      </div>
    );
  }
);

OrderOption.displayName = "OrderOption";

export const NumberOption = forwardRef<HTMLDivElement, OptionProps>(
  ({ data, isFocused, isSelected, className, innerProps }, ref) => {
    const currentData = data as SelectionPokemonRange;
    const color = SELECTLEVELCOLORS[currentData.value];

    return (
      <div
        className={classNames(
          styles.optionFull,
          isFocused && styles.optionFocus,
          isSelected && styles.optionSelected,
          className
        )}
        ref={ref}
        {...innerProps}
      >
        <span style={{ background: color }}>
          <FilterIcon width={10} height={10} />
        </span>
        <p>{currentData.label}</p>
      </div>
    );
  }
);

NumberOption.displayName = "NumberOption";
