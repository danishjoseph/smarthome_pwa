import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceInfo, DeviceDetails } from "../components/types";
const initialState: DeviceDetails = {
  ipAddress: "0.0.0.0",
  firmware: "0.0",
  devices: [],
};

const deviceInfoSlice = createSlice({
  name: "deviceInfo",
  initialState,
  reducers: {
    updateIpAddress(state, action: PayloadAction<{ ip: string }>) {
      state.ipAddress = action.payload.ip;
    },
    updateFirmware(state, action: PayloadAction<{ firmware: string }>) {
      state.firmware = action.payload.firmware;
    },
    updateDevices(state, action: PayloadAction<{ devices: DeviceInfo[] }>) {
      state.devices = action.payload.devices;
    },
  },
});
export const deviceInfoActions = deviceInfoSlice.actions;
export default deviceInfoSlice.reducer;
