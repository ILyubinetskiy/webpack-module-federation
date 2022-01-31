import React from "react";
import { Provider } from "react-redux";
import { store, useAppSelector } from ".";
import { usersSelectors } from "./users/usersSlice";

export function useStore() {
  const users = useAppSelector(usersSelectors.selectAll);

  return {
    users
  };
}

export function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
