import { configureStore } from "@reduxjs/toolkit";

import MainStates from "./Reducers/MainSlice";
import UFStates from "./Reducers/UFSlice";
export const store = configureStore({
  reducer: {
    MainStates: MainStates,
    UFStates: UFStates,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
