import { PossibleTypes as PokemonPossibleTypes } from "@/@types/pokemon";
import { POKEMONTYPECOLORS } from "@/utils/pokemon-type-colors";
import { POKEMONTYPEICONS } from "@/utils/pokemon-type-icons";
import classNames from "classnames";
import {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  ElementRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import SelectComponent, {
  ContainerProps,
  MenuListProps,
  MenuProps,
  MultiValueProps,
  NoticeProps,
  ValueContainerProps,
} from "react-select";
import styles from "./styles.module.scss";
import { Trigger } from "./trigger";

export const Select = forwardRef<
  ElementRef<typeof SelectComponent>,
  ComponentPropsWithoutRef<typeof SelectComponent>
>(
  (
    {
      components,
      unstyled = true,
      isClearable = true,
      hideSelectedOptions = false,
      ...props
    },
    ref
  ) => {
    const id = String(Date.now());
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
      <SelectComponent
        unstyled={unstyled}
        id={id}
        isClearable={isClearable}
        hideSelectedOptions={hideSelectedOptions}
        ref={ref}
        components={{
          SelectContainer,
          Control: Trigger,
          IndicatorSeparator: null,
          ValueContainer,
          Menu,
          MenuList,
          MultiValue,
          NoOptionsMessage,
          ...components,
        }}
        {...props}
      />
    ) : (
      <SelectSkeleton />
    );
  }
);

Select.displayName = "Select";

const SelectContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, isFocused, innerProps }, ref) => {
    return (
      <div
        className={classNames(
          isFocused ? styles.containerFocus : styles.container,
          className
        )}
        ref={ref}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

SelectContainer.displayName = "SelectContainer";

const ValueContainer = forwardRef<HTMLDivElement, ValueContainerProps>(
  ({ children, className, innerProps }, ref) => {
    return (
      <div
        className={classNames(styles.valueContainer, className)}
        ref={ref}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

ValueContainer.displayName = "ValueContainer";

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, className, innerProps }, ref) => {
    return (
      <div
        className={classNames(styles.menu, className)}
        ref={ref}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

Menu.displayName = "Menu";

const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, className, innerProps }, ref) => {
    return (
      <div
        className={classNames(styles.menuWrapper, className)}
        ref={ref}
        {...innerProps}
      >
        {children}
      </div>
    );
  }
);

MenuList.displayName = "MenuList";

export type SelectionData = {
  value: string;
  label: string;
};

const MultiValue = forwardRef<HTMLDivElement, MultiValueProps>(
  ({ data, className, innerProps }, ref) => {
    const currentData = data as SelectionData;
    const currentDataValue = currentData.value as PokemonPossibleTypes;
    const colors = POKEMONTYPECOLORS[currentDataValue];

    return (
      <div
        className={classNames(styles.value, className)}
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

MultiValue.displayName = "MultiValue";

export const NoOptionsMessage = forwardRef<HTMLDivElement, NoticeProps>(
  ({ className, innerProps }, ref) => {
    return (
      <div
        className={classNames(styles.noOptions, className)}
        ref={ref}
        {...innerProps}
      >
        No options
      </div>
    );
  }
);

NoOptionsMessage.displayName = "NoOptionMessage";

type SelectPlaceholderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  leftIcon?: ReactNode;
};

export const SelectPlaceholder = forwardRef<
  HTMLDivElement,
  SelectPlaceholderProps
>(({ children, leftIcon, className }, ref) => {
  return (
    <div className={classNames(styles.placeholder, className)} ref={ref}>
      {leftIcon}
      {children}
    </div>
  );
});

SelectPlaceholder.displayName = "SelectPlaceholder";

const SelectSkeleton = () => {
  return <div className={styles.selectSkeleton} />;
};
