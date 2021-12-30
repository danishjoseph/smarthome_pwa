import { Device } from "./types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import SwitchIcon from "./SwitchIcon";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  alignContent: "center",
}));

interface Props {
  list: Device[];
}

const RoomList = (props: Props) => {
  return (
    <Grid container spacing={{ xs: 2 }}>
      {props.list.map((item, index) => (
        <Grid item xs={6} key={item.id}>
          <Item>
            <SwitchIcon key={item.id} label={item} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoomList;
