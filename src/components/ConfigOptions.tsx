import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AodIcon from "@mui/icons-material/Aod";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SystemUpdateIcon from "@mui/icons-material/SystemUpdate";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { IconButton } from "@mui/material";
import ModalBox from "./ModalBox";
import { sendMessage } from "../mqtt";
import { useAppSelector } from "../hooks";
import DeviceTable from "./Modals/DeviceTable";
import FirmwareUpdate from "./Modals/FirmwareUpdate";
import RestartDevice from "./Modals/RestartDevice";
import ResetDevice from "./Modals/ResetDevice";

interface Props {
  roomName: string;
}

const ConfigOptions = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [firmwareUpdateOpen, setFirmwareUpdateOpen] = useState<boolean>(false);
  const [restartModalOpen, setRestartModalOpen] = useState<boolean>(false);

  const deviceInfo = useAppSelector((state) => state.deviceInfo);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleInfoClick = async () => {
    setInfoOpen(true);
    await sendMessage(`${props.roomName}/deviceinfo`, "");
  };

  return (
    <List>
      <ListItemButton onClick={() => handleClick()}>
        <ListItemIcon>
          <AodIcon />
        </ListItemIcon>
        <ListItemText primary={props.roomName.toLowerCase()} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <IconButton aria-label="InfoIcon" onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
          <IconButton
            aria-label="CancelPresentationIcon"
            onClick={() => setDeleteOpen(true)}
          >
            <CancelPresentationIcon />
          </IconButton>
          <IconButton
            aria-label="SystemUpdateIcon"
            onClick={() => setFirmwareUpdateOpen(true)}
          >
            <SystemUpdateIcon />
          </IconButton>
          <IconButton
            aria-label="RestartAltIcon"
            onClick={() => setRestartModalOpen(true)}
          >
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Collapse>
      <ModalBox showModal={infoOpen} onClose={() => setInfoOpen(false)}>
        <DeviceTable deviceDetails={deviceInfo} />
      </ModalBox>
      <ModalBox showModal={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <ResetDevice roomName={props.roomName} />
      </ModalBox>
      <ModalBox
        showModal={firmwareUpdateOpen}
        onClose={() => setFirmwareUpdateOpen(false)}
      >
        <FirmwareUpdate roomName={props.roomName} />
      </ModalBox>
      <ModalBox
        showModal={restartModalOpen}
        onClose={() => setRestartModalOpen(false)}
      >
        <RestartDevice
          roomName={props.roomName}
          onModalClose={() => setRestartModalOpen(false)}
        />
      </ModalBox>
    </List>
  );
};
export default ConfigOptions;
