import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState:boolean = false;

const mqttSlice = createSlice({
  name: "mqtt",
  initialState,
  reducers: {
    updateState(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const mqttActions = mqttSlice.actions;
export default mqttSlice.reducer;
