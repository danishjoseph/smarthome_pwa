import { Container, Typography, Grid, Button } from "@mui/material";
import CameraCard from "../components/CameraCard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState } from "react";
import ModalBox from "../components/ModalBox";
import AddCamera from "../components/Modals/AddCamera";
import { CameraFeed as CamType } from "../components/types";

const CameraFeed = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [cameraData, setCameraData] = useState(
    JSON.parse(localStorage.getItem("cameraFeed") as string) || []
  );
  return (
    <Container
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" align="center" margin={6}>
        Camera Feeds
      </Typography>

      <Grid container spacing={2}>
        {cameraData.length === 0 ? (
          <p>No Feeds added</p>
        ) : (
          cameraData.map((e: CamType) => {
            return (
              <Grid item xs={12} md={6} key={e.name}>
                <CameraCard
                  url={e.url}
                  title={e.name}
                  onItemRemove={() => {
                    setCameraData(
                      JSON.parse(
                        localStorage.getItem("cameraFeed") as string
                      ) || []
                    );
                  }}
                />
              </Grid>
            );
          })
        )}
      </Grid>
      <Button
        variant="outlined"
        startIcon={<AddTaskIcon />}
        sx={{ margin: "1rem" }}
        onClick={() => setOpen(true)}
      >
        Add New
      </Button>
      <ModalBox showModal={open} onClose={() => setOpen(false)}>
        <AddCamera
          onModalClose={() => {
            setCameraData(
              JSON.parse(localStorage.getItem("cameraFeed") as string) || []
            );
            setOpen(false);
          }}
        />
      </ModalBox>
    </Container>
  );
};
export default CameraFeed;
