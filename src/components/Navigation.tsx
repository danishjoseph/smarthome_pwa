import React, { Fragment, useState } from "react";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
type ColorMode = "light" | "dark";
interface Props {
  onUpdateTheme: (color: "light" | "dark") => void;
}

const Navigation = (props: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [colorMode, setColorMode] = useState(
    localStorage.getItem("colorMode") || "light"
  );

  const actions = [
    { icon: <HomeIcon />, name: "Home", id: "/" },
    {
      icon: <SettingsInputComponentIcon />,
      name: "Configure Device",
      id: "/configure",
    },
    {
      icon: colorMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />,
      name: `switch to ${colorMode === "light" ? "dark mode" : "light mode"}`,
      id: colorMode === "light" ? "dark" : "light",
    },
  ];
  const [direction] = React.useState<SpeedDialProps["direction"]>("down");

  const clickHandler = (id?: string) => {
    if (id === "dark" || id === "light") {
      props.onUpdateTheme(id as ColorMode);
      setColorMode(id as ColorMode);
    } else {
      navigate(`${id}`);
    }
  };

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 16, right: 16 }}
        FabProps={{ size: "small" }}
        icon={<SpeedDialIcon icon={<SettingsIcon />} />}
        direction={direction}
      >
        {actions
          .filter((action) => action.id !== pathname)
          .map((action) => (
            <SpeedDialAction
              key={action.name}
              id={action.id}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => clickHandler(action.id)}
            />
          ))}
      </SpeedDial>
    </Fragment>
  );
};

export default Navigation;
