import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { SelectPokemonRange } from "@/data/select";
import { POKEMONFILTERLEVELCOLORS, POKEMONTYPECOLORS } from "@/utils/pokemons";
import classNames from "classnames";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import SelectComponent, {
  ContainerProps,
  ControlProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  NoticeProps,
  OptionProps,
  Props as SelectComponentProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";
import { FilterIcon } from "../icons/filter-icon";
import { StarIcon } from "../icons/star-icon";
import styles from "./styles.module.scss";

export type SelectValueData = {
  value: string;
  label: string;
};

type SelectPlaceholderProps = {
  label: string;
  icon: ReactNode;
};

type SelectProps = SelectComponentProps & {
  type?: "type" | "number" | "ability" | "order";
};

export const Select = ({
  isClearable = true,
  components,
  type = "type",
  hideSelectedOptions = false,
  ...props
}: SelectProps) => {
  const POSSIBLEOPTIONTYPE = {
    type: TypeOption,
    number: NumberOption,
    ability: AbilityOption,
    order: OrderOption,
  };

  const POSSIBLESINGLEVALUE = {
    type: undefined,
    number: NumberSingleValue,
    ability: AbilitySingleValue,
    order: OrderSingleValue,
  };

  const POSSIBLECONTROLS = {
    type: BaseControl,
    number: BaseControl,
    ability: BaseControl,
    order: OrderControl,
  };

  const id = String(Date.now());
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <SelectComponent
      unstyled
      id={id}
      isClearable={isClearable}
      blurInputOnSelect={false}
      hideSelectedOptions={hideSelectedOptions}
      components={{
        SelectContainer,
        Control: POSSIBLECONTROLS[type],
        IndicatorSeparator: null,
        ValueContainer,
        Menu,
        MenuList,
        MultiValue,
        Option: POSSIBLEOPTIONTYPE[type],
        NoOptionsMessage,
        SingleValue: POSSIBLESINGLEVALUE[type],
        ...components,
      }}
      {...props}
    />
  ) : (
    <SelectSkeleton />
  );
};

export const SelectPlaceholder = ({ label, icon }: SelectPlaceholderProps) => {
  return (
    <div className={styles.placeholder}>
      {icon}
      <p>{label}</p>
    </div>
  );
};

const SelectContainer = ({
  children,
  isFocused,
  innerProps,
}: ContainerProps) => {
  return (
    <div
      className={!isFocused ? styles.container : styles.containerFocus}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const BaseControl = ({ children, innerProps, innerRef }: ControlProps) => {
  return (
    <div ref={innerRef} className={styles.trigger} {...innerProps}>
      {children}
    </div>
  );
};

const OrderControl = ({ children, innerProps, innerRef }: ControlProps) => {
  return (
    <div ref={innerRef} className={styles.orderTrigger} {...innerProps}>
      {children}
    </div>
  );
};

const ValueContainer = ({ children, innerProps }: ValueContainerProps) => {
  return (
    <div className={styles.valueContainer} {...innerProps}>
      {children}
    </div>
  );
};

const Menu = ({
  children,
  innerProps,
  innerRef,
}: MenuProps) => {
  return (
    <div className={styles.menu} ref={innerRef} {...innerProps}>
      {children}
    </div>
  );
};

const MenuList = ({ children, innerProps, innerRef }: MenuListProps) => {
  return (
    <div className={styles.menuWrapper} ref={innerRef} {...innerProps}>
      {children}
    </div>
  );
};

const MultiValue = ({ data, innerProps, children }: MultiValueProps) => {
  const currentData = data as SelectValueData;
  const currentDataValue = currentData.value as PokemonPossibleTypes;
  const colors = POKEMONTYPECOLORS[currentDataValue];

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: colors.medium }}>
        <Image
          width={10}
          height={10}
          src={`/icons/pokemon/${currentData.value}.svg`}
          alt={currentData.value}
        />
      </span>
      <p style={{ color: colors.medium }}>{currentData.label}</p>
    </div>
  );
};

const AbilitySingleValue = ({
  data,
  innerProps,
  children,
}: SingleValueProps) => {
  const currentData = data as SelectValueData;

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: "var(--colors-yellow)" }}>
        <StarIcon width={10} height={10} />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const OrderSingleValue = ({ data, innerProps, children }: SingleValueProps) => {
  const currentData = data as SelectValueData;
  return (
    <div className={styles.value} {...innerProps}>
      <p className={styles.order}>{currentData.label}</p>
    </div>
  );
};

const NumberSingleValue = ({
  data,
  innerProps,
  children,
}: SingleValueProps) => {
  const currentData = data as SelectPokemonRange;
  const color = POKEMONFILTERLEVELCOLORS[currentData.value];

  return (
    <div className={styles.value} {...innerProps}>
      <span style={{ background: color }}>
        <FilterIcon width={10} height={10} />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const TypeOption = ({
  data,
  isFocused,
  isSelected,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectValueData;
  const currentDataValue = currentData.value as PokemonPossibleTypes;
  const colors = POKEMONTYPECOLORS[currentDataValue];

  return (
    <div
      className={classNames(
        styles.option,
        isFocused && styles.optionFocus,
        isSelected && styles.optionSelected
      )}
      style={{ "--outline-color": colors.medium } as React.CSSProperties}
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: colors.medium }}>
        <Image
          width={10}
          height={10}
          src={`/icons/pokemon/${currentData.value}.svg`}
          alt={currentData.value}
        />
      </span>
      <p style={{ color: colors.medium }}>{currentData.label}</p>
    </div>
  );
};

const AbilityOption = ({
  data,
  isFocused,
  isSelected,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectValueData;

  return (
    <div
      className={classNames(
        styles.optionFull,
        isFocused && styles.optionFocus,
        isSelected && styles.optionSelected
      )}
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: "var(--colors-yellow)" }}>
        <StarIcon width={10} height={10} />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const OrderOption = ({
  data,
  isFocused,
  isSelected,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectValueData;

  return (
    <div
      className={classNames(
        styles.optionFull,
        isFocused && styles.optionFocus,
        isSelected && styles.optionSelected
      )}
      ref={innerRef}
      {...innerProps}
    >
      <p>{currentData.label}</p>
    </div>
  );
};

const NumberOption = ({
  data,
  isFocused,
  isSelected,
  innerRef,
  innerProps,
}: OptionProps) => {
  const currentData = data as SelectPokemonRange;
  const color = POKEMONFILTERLEVELCOLORS[currentData.value];

  return (
    <div
      className={classNames(
        styles.optionFull,
        isFocused && styles.optionFocus,
        isSelected && styles.optionSelected
      )}
      ref={innerRef}
      {...innerProps}
    >
      <span style={{ background: color }}>
        <FilterIcon width={10} height={10} />
      </span>
      <p>{currentData.label}</p>
    </div>
  );
};

const NoOptionsMessage = ({ innerProps }: NoticeProps) => {
  return (
    <div className={styles.noOptions} {...innerProps}>
      No options
    </div>
  );
};

const SelectSkeleton = () => {
  return <div className={styles.selectSkeleton} />;
};
