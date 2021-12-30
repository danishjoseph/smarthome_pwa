import mqtt from "mqtt";
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
    store.dispatch(mqttActions.updateState(true))
  });

  // mqtt subscriptions
  mqttClient.subscribe("dlist/+/online");
  mqttClient.subscribe("dlist/+/list");
  mqttClient.subscribe("home/+/+/state");

  mqttClient.on("message", async (topic: string, payload: any) => {
    const dlist_online = /(dlist\/)\w.+(\/online)/; // match topic -> dlist/+/online
    const dlist_list = /(dlist\/)\w.+(\/list)/; // match topic -> dlist/+/list
    const home_state = /(home\/)\w.+\/\w.+(\/state)/; // match topic -> home/+/+/state

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
        let newDevice = Object.assign(e,{rName:rName,id: `${rName}/${e.dName}`})
        store.dispatch(deviceActions.add({device: newDevice}));
      });
    } else if (home_state.test(topic)) {
      let [, rName, dName] = topic.split("/");
      let val: number = JSON.parse(String(payload));
      let id = `${rName}/${dName}`;
      store.dispatch(deviceActions.updateState({ id,val }));
      // const dState = await deviceLogic.updateDeviceState(id, state);
      // if (dState) {
      //   await reportState(id, { on: state });
      //   logger.warn(`switch trigger : ${id} ${state}`);
      // }
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

