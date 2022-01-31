import React from "react";
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from ".";
import { increment, usersSelectors } from "./users/usersSlice";

export function useStore() {
  const dipatch = useAppDispatch()
  const users = useAppSelector(usersSelectors.selectAll);
  const value = useAppSelector(store => store.users.value);
  const onIncrement = () => dipatch(increment())

  return {
    users,
    value,
    onIncrement
  };
}

// export const user = useAppSelector(usersSelectors.selectAll);
export function StoreProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
