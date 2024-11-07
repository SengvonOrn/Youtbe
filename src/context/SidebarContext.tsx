import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarProviderProps = {
  children: ReactNode;
};
type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);
export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) throw Error("Cannot use outside of SidebarProvider");

  return value;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isLargeOpen, setLargOpen] = useState(true);
  const [isSmallOpen, setSmallOpen] = useState(false);

  const isScreenSmall = () => {
    return window.innerWidth < 1024;
  };

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setSmallOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const toggle = () => {
    if (isScreenSmall()) {
      setSmallOpen((s) => !s);
    } else {
      setLargOpen((l) => !l);
    }
  };
  const close = () => {
    if (isScreenSmall()) {
      setSmallOpen(false);
    } else {
      setLargOpen(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
