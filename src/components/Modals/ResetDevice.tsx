import { Typography, Stack, Chip } from "@mui/material";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
interface Props {
  roomName: string;
}
const ResetDevice = (props: Props) => {
      const handleRemovedataClick = async () => {
        console.log("handleRemovedataClick:", `${props.roomName}/cleardata`);
        // await sendMessage(`${props.roomName}/cleardata`, "");
      };
      const handleFactoryResetClick = async () => {
        console.log("handleFactoryResetClick:", `${props.roomName}/clearwifi`);
        // await sendMessage(`${props.roomName}/clearwifi`, "");
      };
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <GppMaybeIcon fontSize="large" color="warning" />
      </div>
      <Typography variant="h6" textAlign="center" padding={2}>
        You can't undo this operation !!
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Chip
          icon={<PlaylistRemoveIcon />}
          label="Device data"
          color="default"
          onClick={handleRemovedataClick}
        />
        <Chip
          icon={<HighlightOffIcon />}
          label="Factory Reset"
          color="error"
          onClick={handleFactoryResetClick}
        />
      </Stack>
    </>
  );
};

export default ResetDevice;
