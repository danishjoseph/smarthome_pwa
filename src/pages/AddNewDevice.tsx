import { Container, Grid, Paper, Typography } from "@mui/material";
import { DeviceTree } from "../components/types";
import { useAppSelector } from "../hooks";

interface Props {}

const roomCardStyle = {
  boxShadow: 1,
  borderRadius: 2,
  p: 2,
  minWidth: 300,
  border: "2px solid 'background.default'"
} as const;




const AddNewDevice = (props: Props) => {
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
        {Object.keys(rList).map((e: keyof DeviceTree, i: number) => (
          <Grid item xs={12} md={6}>
            <Paper sx={roomCardStyle}>{e}</Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AddNewDevice;
