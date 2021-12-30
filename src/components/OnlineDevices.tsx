import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useAppSelector } from "../hooks";
import SwitchIcon from "./SwitchIcon";

const useStyles = makeStyles({
  iconHover: {
    cursor: "pointer",
    padding: "2px",
  },
  listItems: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1em",
    "& > *": {
      flex: "0 1 4em",
    },
  },
});
interface Props {}

const OnlineDevices = (props: Props) => {
  const classes = useStyles();
  const devices = useAppSelector((state) => state.devices);
  return (
    <Box>
      <Typography variant="h5" component="h2">
        Online Devices
      </Typography>
      <div className={classes.listItems}>
        {/* eslint-disable-next-line array-callback-return */}
        {devices.map((e, i) => {
          if (e.cState) {
            // return <SwitchIcon key={Math.random()} label={e}/>;
            return <SwitchIcon key={e.id} label={e} />;
          }
        })}
      </div>
    </Box>
  );
};

export default OnlineDevices;
