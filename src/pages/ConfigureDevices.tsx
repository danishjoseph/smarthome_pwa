import { Container, Grid, Typography } from "@mui/material";
import { DeviceTree } from "../components/types";
import { useAppSelector } from "../hooks";
import ConfigOptions from '../components/ConfigOptions'

interface Props {}

const ConfigureDevices = (props: Props) => {
  const devices = useAppSelector((state) => state.devices);
  const rList: DeviceTree = devices.reduce((a: any, curr: any) => {
    if (!a[curr.rName]) {
      a[curr.rName] = [];
    }
    a[curr.rName].push(curr);
    return a;
  }, {});

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
        Configure Devices
      </Typography>
      <Grid container spacing={2} item={true}>
        {Object.keys(rList).map((e: string) => (
          <Grid item xs={12} md={6} key={e}>
            <ConfigOptions roomName={e} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ConfigureDevices;
