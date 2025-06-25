"use client";

import { loadState, saveState } from "@/redux/persistence";
import { loadPersistedUserState } from "@/redux/slice/user-slice";
import { store } from "@/redux/store";
import type React from "react";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load persisted state on mount
    const persistedState = loadState();

    if (persistedState) {
      if (persistedState.user) {
        store.dispatch(loadPersistedUserState(persistedState.user));
      }
    }

    // Subscribe to store changes and save to localStorage
    const unsubscribe = store.subscribe(() => {
      saveState({ user: store.getState().user });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
