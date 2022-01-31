import React from "react";
import { Provider } from "react-redux";
import { store, useAppSelector } from ".";
import { usersSelectors } from "./users/usersSlice";

export const StoreProvider = ({ children }: any) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export const useStore = () => {
  const users = useAppSelector(usersSelectors.selectAll);

  return {
    users
  };
};