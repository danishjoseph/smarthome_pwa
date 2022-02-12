import { Typography, Stack, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
interface Props {
  title: string;
  onModalClose: (val:"YES"|"NO") => void;
}
const ConfirmDialog = (props: Props) => {
  const handleRestartClick = async () => {
    props.onModalClose("YES");
  };
  const handleBackClick = async () => {
    props.onModalClose("NO");
  };
  return (
    <>
      <Typography variant="h6" textAlign="center" padding={2}>
        {props.title}
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

export default ConfirmDialog;
