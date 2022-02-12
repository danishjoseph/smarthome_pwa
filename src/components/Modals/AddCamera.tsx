import { Typography, Stack, Chip, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { CameraFeed } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  onModalClose: () => void;
}
const AddCamera = (props: Props) => {
  const [inputData, setInputData] = useState({ name: "", url: "" });
  const [errors, setErrors] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputData.name !== "" && inputData.url !== "") {
      setErrors(false);
    } else {
      setErrors(true);
    }
  }, [inputData]);
  const updateInputData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputData((prevState: CameraFeed) => {
      let data = Object.assign({}, prevState);
      if (event.target.id === "name" || event.target.id === "url") {
        data[event.target.id] = event.target.value;
      }
      return data;
    });
  };
  const handleSave = () => {
    const prevData: CameraFeed[] =
      JSON.parse(localStorage.getItem("cameraFeed") as string) || [];
    const index: number = prevData.findIndex(
      (item: CameraFeed) => item.name === inputData.name
    );
    if (index === -1) {
      prevData.push(inputData);
    } else {
      prevData[index] = inputData;
    }
    localStorage.setItem("cameraFeed", JSON.stringify(prevData));
    navigate("/camerafeed");
    props.onModalClose()
  };
  return (
    <>
      <Typography variant="h6" textAlign="center" padding={1}>
        Enter Details
      </Typography>
      <Stack direction="column" justifyContent="center" spacing={2}>
        <TextField
          size="small"
          id="name"
          label="Name"
          color="primary"
          onChange={(e) => updateInputData(e)}
        />
        <TextField
          size="small"
          id="url"
          label="url"
          color="primary"
          onChange={(e) => updateInputData(e)}
        />
        <Chip
          icon={<SaveIcon />}
          label="SAVE"
          color={errors ? "default" : "primary"}
          disabled={errors}
          onClick={handleSave}
        />
      </Stack>
    </>
  );
};
export default AddCamera;
