export type Device = {
  id: string;
  rName: string;
  dName: string;
  dType: string;
  cState: number;
};
export type DeviceInfo = {
  dName: string;
  dType: string;
  rPin: number;
  sPin: number;
  cState: number;
};

export type DeviceDetails = {
  ipAddress: string;
  firmware: string;
  devices: DeviceInfo[];
};

export type DeviceTree = {
  [key: string]: Device[];
};
