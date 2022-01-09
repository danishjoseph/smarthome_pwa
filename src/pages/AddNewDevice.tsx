import { Container, Grid, Paper, Typography } from "@mui/material";
import { DeviceTree } from "../components/types";
import { useAppSelector } from "../hooks";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import FolderIcon from "@mui/icons-material/Folder";
import PageviewIcon from "@mui/icons-material/Pageview";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface Props {}

const roomCardStyle = {
  boxShadow: 1,
  borderRadius: 2,
  p: 2,
  minWidth: 300,
  border: "2px solid 'background.default'",
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
            <Paper sx={roomCardStyle}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {e}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <FolderIcon  />
                  </Avatar>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <PageviewIcon />
                  </Avatar>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <AssignmentIcon />
                  </Avatar>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AddNewDevice;
