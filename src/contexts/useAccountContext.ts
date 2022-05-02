import { createContext, useContext } from "react";

export const AccountContext = createContext({} as Account);

export function useAccountContext() {
  return useContext(AccountContext);
}
