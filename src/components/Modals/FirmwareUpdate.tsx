import {
  Button,
  CircularProgress,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks";
import { sendMessage } from "../../mqtt";
import { store } from "../../store/store";
import { deviceInfoActions } from "../../store/deviceInfo";
interface Props {
  roomName: string;
}

const FirmwareUpdate = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [spinner, setSpinner] = useState(false);
  const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const ipAddress = useAppSelector((state) => state.deviceInfo.ipAddress);
  const firmware = useAppSelector((state) => state.deviceInfo.firmware);
  useEffect(() => {
    const publishMessage = async () => {
      await sendMessage(`${props.roomName}/ipaddress`, "");
      await sendMessage(`${props.roomName}/firmware`, "");
    };
    publishMessage();
    return () => {
      store.dispatch(deviceInfoActions.updateIpAddress({ ip: "0.0.0.0" }));
    };
  }, [props.roomName]);

  const handleClick = async () => {
    let formdata = new FormData();
    if (file) {
      formdata.append("bin", file);
    }
    try {
      setSpinner(true);
      await axios({
        url: `http://${ipAddress}/`,
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        data: formdata,
      });
    } catch (error) {
      fileInputRef.current.value = "";
      setSpinner(false);
    }
  };

  return (
    <>
      <Typography variant="h6" textAlign="center" padding={2}>
        Firmware Update
      </Typography>
      <Typography variant="subtitle2" textAlign="center">
        Current Firmware : {`V${firmware}`}
      </Typography>
      <Typography variant="subtitle2" textAlign="center">
        Device IP : {ipAddress}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} padding={2}>
        <Input
          id="contained-button-file"
          type="file"
          ref={fileInputRef}
          disableUnderline
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files) {
              return;
            }
            setFile(event.target.files[0]);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleClick}
        >
          {spinner ? <CircularProgress color="inherit" size={30} /> : "upload"}
        </Button>
      </Stack>
    </>
  );
};

export default FirmwareUpdate;
