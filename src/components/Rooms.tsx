import {
  Badge,
  Box,
  Modal,
  Paper,
  Switch,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import RoomList from "./RoomList";
import * as mqtt from "../mqtt";
import { DeviceTree } from "./types";

interface Props {
  height: string;
  title: string;
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  iconHover: {
    cursor: "pointer",
    padding: "2px",
  },
  listItems: (props: Props) => ({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: props.height,
    padding: "1rem 0rem",
    gap: "0.5rem",
    overflowX: "scroll",
    overflowY: "hidden",
  }),
  roomCard: {
    height: "6em",
    width: "10em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxHeight: "50%",
    bgcolor: "#fff",
    borderRadius: 1,
    p: 2,
    outline: 0,
  },
  switchIcon: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
  },
}));

const Rooms = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<keyof DeviceTree>("");

  const handleOpen = (e: keyof DeviceTree) => {
    setOpen(true);
    setActiveId(e);
  };
  const handleToggleChange = async (event: any) => {
    event.stopPropagation();
    let val = event.target.checked ? "1" : "0";
    rList[event.target.id].forEach(async (item) => {
      await mqtt.sendMessage(`home/${item.id}/onoff`, val);
    });
  };
  const handleClose = () => setOpen(false);

  const classes = useStyles(props);
  const devices = useAppSelector((state) => state.devices);
  const rList: DeviceTree = devices.reduce((a: any, curr: any) => {
    if (!a[curr.rName]) {
      a[curr.rName] = [];
    }
    a[curr.rName].push(curr);
    return a;
  }, {});

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "50%", md: "25%" },
    borderRadius: 1,
    bgcolor: "background.paper",
    p: 2,
    outline: 1,
  };

  return (
    <Box>
      <Typography variant="h5" component="h2">
        {props.title}
      </Typography>
      <div className={classes.listItems}>
        {devices.length === 0 ? (
          <p>Loading...</p>
        ) : (
          Object.keys(rList).map((e: keyof DeviceTree, i: number) => {
            return (
              <Paper
                variant="outlined"
                className={classes.roomCard}
                key={i}
                onClick={() => handleOpen(e)}
              >
                <Badge
                  badgeContent={rList[e].filter((e) => e.cState === 1).length}
                  color="primary"
                >
                  <Typography variant="body2" align="center" component="h2">
                    {String(e).toLowerCase()}
                  </Typography>
                </Badge>
                <Switch
                  checked={!!rList[e].filter((e) => e.cState === 1).length}
                  id={e.toString()}
                  onClick={handleToggleChange}
                  size="small"
                />
              </Paper>
            );
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
          <RoomList list={rList[activeId]} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Rooms;
