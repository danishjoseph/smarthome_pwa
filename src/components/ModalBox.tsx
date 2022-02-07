import { Box, Modal } from "@mui/material";
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
  children: React.ReactNode
}

const ModalBox = ({ showModal = false, onClose,children }: Props) => {
  return (
    <Modal
      open={showModal}
      onClose={()=> onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalBox;
