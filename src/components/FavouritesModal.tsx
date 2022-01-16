import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeviceList from "./DeviceList";
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


interface Props {
  showModal: boolean;
  onClose: () => void;
}

const FavouritesModal = ({ showModal = false, onClose }: Props) => {
  return (
    <Modal
      open={showModal}
      onClose={()=> onClose()}
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
  );
};

export default FavouritesModal;
