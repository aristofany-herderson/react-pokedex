import { useToggle } from "@uidotdev/usehooks";
import { createContext, ReactNode, useContext } from "react";

type AppContextData = {
  isAsideOpen: boolean;
  setOrToggleIsAsideOpen: (state?: boolean) => void;
};

export const AppContext = createContext({} as AppContextData);

type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [isAsideOpen, setOrToggleIsAsideOpen] = useToggle(false);

  return (
    <AppContext.Provider
      value={{
        isAsideOpen,
        setOrToggleIsAsideOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  return useContext(AppContext);
};
