export type Device=  {
  id: string;
  rName: string;
  dName: string;
  dType: string;
  cState: number;
}

export type DeviceTree = {
  [key: string]: Device[];
}
