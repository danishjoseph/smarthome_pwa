import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OnlineDevices from "../components/OnlineDevices";
import Favourites from "../components/Favourites";
import Rooms from "../components/Rooms";
import * as mqtt from "../mqtt";
import { useAppSelector } from "../hooks";

interface Props {}

const Home = (props: Props) => {
  const mqttStatus = useAppSelector((state) => state.mqtt);
  const [connectionStatus, setConnectionStatus] = React.useState(mqttStatus);

  useEffect(() => {
    mqtt.connect();
  }, []);

  useEffect(() => {
    setConnectionStatus(mqttStatus);
  }, [mqttStatus]);

  return (
    <Container
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" align="center" margin={6}>
        Smart Home {connectionStatus ? "connected" : "not Connected"}
      </Typography>
      <Favourites />
      <Rooms height="250px" title="Rooms" />
      <OnlineDevices />
    </Container>
  );
};

export default Home;
