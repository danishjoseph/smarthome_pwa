import { Typography, Stack, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { sendMessage } from "../../mqtt";
interface Props {
  roomName: string;
  onModalClose: () => void;
}
const RestartDevice = (props: Props) => {
  const handleRestartClick = async () => {
    await sendMessage(`${props.roomName}/restart`, "");
    props.onModalClose();
  };
  const handleBackClick = async () => {
    props.onModalClose();
  };
  return (
    <>
      <Typography variant="h6" textAlign="center" padding={2}>
        Are you sure you want restart {props.roomName.toLowerCase()} ?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Chip
          icon={<CheckCircleOutlineIcon />}
          label="Yes"
          color="error"
          onClick={handleRestartClick}
        />
        <Chip
          icon={<CancelIcon />}
          label="No"
          color="default"
          onClick={handleBackClick}
        />
      </Stack>
    </>
  );
};

export default RestartDevice;
