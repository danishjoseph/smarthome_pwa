import { Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import SwitchIcon from "./SwitchIcon";
import { useState } from "react";
import DeviceList from "./DeviceList";
import { Device } from "./types";
import { useAppSelector } from "../hooks";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "50%",
  borderRadius: 1,
  border: 1,
  p: 2,
  color: "text.primary",
  borderColor: "primary.main",
  bgcolor: "background.paper",
} as const;

interface Props {}

const Favourites = (props: Props) => {
  const [open, setOpen] = useState(false);
  const favDevices: string[] =
    JSON.parse(localStorage.getItem("favDevices") as string) || [];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const devices: Device[] = useAppSelector((state) => state.devices);

  // eslint-disable-next-line array-callback-return
  const favorites = devices.filter((item) => favDevices.includes(item.id));
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" component="h2">
        Favourites
        <AddIcon
          className={classes.iconHover}
          fontSize="small"
          color="primary"
          onClick={handleOpen}
        />
      </Typography>
      <div className={classes.listItems}>
        {favorites.length === 0 ? (
          <p>No devices added</p>
        ) : (
          favorites.map((e: Device) => {
            return <SwitchIcon key={Math.random()} label={e} />;
          })
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add or Remove
          </Typography>
          <DeviceList />
        </Box>
      </Modal>
    </Box>
  );
};

export default Favourites;
