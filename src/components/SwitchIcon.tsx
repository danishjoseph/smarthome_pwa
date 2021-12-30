import React from "react";
import { styled, Theme } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import * as mqtt from "../mqtt";
interface Props {
  label?: {
    id: string;
    rName: string;
    dName: string;
    cState: number;
  };
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0.5,
  transform: "rotate(-90deg)",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    switchCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "0.5rem",
    },
  })
);

const SwitchIcon = (props: Props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(Boolean(props.label?.cState));

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.checked ? "1" : "0";
    mqtt.sendMessage(`home/${event.target.value}/onoff`, val);
    setChecked(Boolean(event.target.checked));
  };
  return (
      <div className={classes.switchCard}>
        <IOSSwitch
          checked={checked}
          value={props.label?.id}
          onChange={handleChange}
        />
        {props.label && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <Typography variant="caption">{props.label.rName}</Typography>
            <Typography variant="caption" align="center">
              {props.label.dName}
            </Typography>
          </Box>
        )}
      </div>
  );
};

export default SwitchIcon;
