import { configureStore } from "@reduxjs/toolkit";
import deviceInfoReducer from "./deviceInfo";
import deviceReducer from "./deviceStore";
import mqttReducer from './mqttStore'

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    mqtt: mqttReducer,
    deviceInfo: deviceInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;