import { Typography, Button, CardMedia, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CameraFeed } from "./types";
import ModalBox from "./ModalBox";
import ConfirmDialog from "./Modals/ConfirmDialog";
import { useState } from "react";
interface Props {
  url: string;
  title: string;
  onItemRemove: () => void;
}
const CameraCard = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDelete = (name: string) => {
    const prevData: CameraFeed[] =
      JSON.parse(localStorage.getItem("cameraFeed") as string) || [];
    const index: number = prevData.findIndex(
      (item: CameraFeed) => item.name === name
    );
    if (index > -1) {
      prevData.splice(index, 1);
    }
    localStorage.setItem("cameraFeed", JSON.stringify(prevData));
  };

  const handleModalClose = async (userInput: "YES" | "NO") => {
    if (userInput === "YES") {
      handleDelete(props.title);
      props.onItemRemove();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };
  return (
    <>
      <CardMedia
        component="video"
        image={props.url}
        title={props.title}
        controls
        autoPlay={true}
        muted
        sx={{ borderRadius: "1.5rem", padding: "0.5rem" }}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={10}
      >
        <Typography variant="button">{props.title}</Typography>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Stack>
      <ModalBox showModal={open} onClose={() => setOpen(false)}>
        <ConfirmDialog
          title="Are you sure you want to Remove ?"
          onModalClose={(val: "YES" | "NO") => handleModalClose(val)}
        />
      </ModalBox>
    </>
  );
};

export default CameraCard;
