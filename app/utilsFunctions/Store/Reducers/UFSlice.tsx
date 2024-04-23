import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UINodeState {
  allUFNode: any[];
  UFeditComponents: {};
  UFAppNVersion: {};
}

const initialState: UINodeState = {
  allUFNode: [],
  UFeditComponents: {},
  UFAppNVersion: { appName: "text1", Version: "v1" },
};

const UFStates = createSlice({
  name: "UF",
  initialState,
  reducers: {
    setUFNode: (state, action: PayloadAction<any[]>) => {
      state.allUFNode = action.payload;
    },

    setUFEditComponents: (state, action: PayloadAction<{}>) => {
      state.UFeditComponents = action.payload;
    },
    setAppName: (state, action: PayloadAction<{}>) => {
      state.UFAppNVersion = { ...state.UFAppNVersion, appName: action.payload };
    },
    setVersionName: (state, action: PayloadAction<{}>) => {
      state.UFAppNVersion = { ...state.UFAppNVersion, Version: action.payload };
    },
    setUFAppAndVersion: (state, action: PayloadAction<{}>) => {
      state.UFAppNVersion = { ...state.UFAppNVersion, ...action.payload };
    },
  },
});

export const { setUFNode, setUFEditComponents, setUFAppAndVersion } =
  UFStates.actions;

export default UFStates.reducer;
