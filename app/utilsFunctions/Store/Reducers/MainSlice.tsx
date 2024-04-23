import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NextUIState {
  tenant: string;
  appGroup : string;
  applicationName : string
  fabric : string;
}

const initialState: NextUIState = {
  tenant: "",
  appGroup : "",
  applicationName : "",
  fabric : "UF",
};

const MainStates = createSlice({
  name: "mainslice",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<string>) => {
      state.tenant = action.payload;
    },
    setAppGroup: (state, action: PayloadAction<string>) => {
      state.appGroup = action.payload;
    },
    setApplicationName : (state , action:PayloadAction<string>) => {
      state.applicationName = action.payload;
    },
    setFabric: (state, action: PayloadAction<string>) => {
      state.fabric = action.payload;
    },
  },
});

export const { setTenant , setAppGroup , setFabric, setApplicationName } = MainStates.actions;

export default MainStates.reducer;
