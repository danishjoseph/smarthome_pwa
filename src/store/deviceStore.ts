import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Device {
  id: string;
  rName: string;
  dName: string;
  dType: string;
  cState: number;
}


const initialState: Device[] = [];

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    add(state, action: PayloadAction<{ device: Device }>) {
      if (state.findIndex((e) => e.id === action.payload.device.id) === -1) {
        state.push(action.payload.device);
      }
    },
    updateState(state, action: PayloadAction<{ id: string; val: number }>) {
      const data: Device | undefined = state.find(
        (e) => e.id === action.payload.id
      );
      if (data) {
        data.cState = action.payload.val;
      }
    },
  },
});

export const deviceActions = deviceSlice.actions;
export default deviceSlice.reducer;
