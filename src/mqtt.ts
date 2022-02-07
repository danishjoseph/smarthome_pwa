import mqtt from "mqtt";
import { deviceInfoActions } from "./store/deviceInfo";
import { deviceActions } from "./store/deviceStore";
import { mqttActions } from "./store/mqttStore";
import { store } from "./store/store";

let mqttClient: any;

export function connect() {
  // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
  // mqttClient = mqtt.connect(`mqtt://${process.env.MOSQUITTO_URL}`);
  mqttClient = mqtt.connect(`ws://192.168.1.8:1884`);
  // Connection callback

  mqttClient.on("connect", async () => {
    store.dispatch(mqttActions.updateState(true));
  });

  // mqtt subscriptions
  mqttClient.subscribe("dlist/+/+");
  // mqttClient.subscribe("dlist/+/online");
  // mqttClient.subscribe("dlist/+/list");
  mqttClient.subscribe("home/+/+/state");

  mqttClient.on("message", async (topic: string, payload: any) => {
    const dlist_online = /(dlist\/)\w.+(\/online)/; // match topic -> dlist/+/online
    const dlist_list = /(dlist\/)\w.+(\/list)/; // match topic -> dlist/+/list
    const home_state = /(home\/)\w.+\/\w.+(\/state)/; // match topic -> home/+/+/state
    const dlist_deviceinfo = /(dlist\/)\w.+(\/deviceinfo)/; // match topic -> dlist/+/deviceinfo
    const dlist_ipAddress = /(dlist\/)\w.+(\/ipaddress)/; // match topic -> dlist/+/ipaddress
    const dlist_firmware = /(dlist\/)\w.+(\/firmware)/; // match topic -> dlist/+/firmware
    if (dlist_online.test(topic)) {
      let payloadBool = JSON.parse(String(payload));
      let [, roomName] = topic.split("/");
      if (payloadBool) {
        await mqttClient.publish(`${roomName}/list`, "");
      } else {
        // await deviceLogic.updateRoomState(roomName, payloadBool);
      }
    } else if (dlist_list.test(topic)) {
      let [, rName] = topic.split("/");
      let payloadJSON: any[] = JSON.parse(String(payload));
      payloadJSON.forEach((e) => {
        let newDevice = Object.assign(e, {
          rName: rName,
          id: `${rName}/${e.dName}`,
        });
        store.dispatch(deviceActions.add({ device: newDevice }));
      });
    } else if (home_state.test(topic)) {
      let [, rName, dName] = topic.split("/");
      let val: number = JSON.parse(String(payload));
      let id = `${rName}/${dName}`;
      store.dispatch(deviceActions.updateState({ id, val }));
    } else if (dlist_deviceinfo.test(topic)) {
      store.dispatch(
        deviceInfoActions.updateDevices({
          devices: JSON.parse(String(payload)),
        })
      );
    } else if (dlist_ipAddress.test(topic)) {
      store.dispatch(
        deviceInfoActions.updateIpAddress({ ip: String(payload) })
      );
    } else if (dlist_firmware.test(topic)) {
      store.dispatch(
        deviceInfoActions.updateFirmware({ firmware: String(payload) })
      );
    }
  });

  mqttClient.on("close", () => {
    store.dispatch(mqttActions.updateState(false));
  });
}

// Sends a mqtt message to topic: mytopic
export async function sendMessage(topic: String, message: String) {
  await mqttClient.publish(topic, message);
  return true;
}
