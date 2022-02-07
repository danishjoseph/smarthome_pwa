import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DeviceDetails, DeviceInfo } from "../types";
import PowerIcon from "@mui/icons-material/Power";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import { Chip } from "@mui/material";
interface Props {
  deviceDetails: DeviceDetails;
}
const DeviceTable = (props: Props) => {
  return (
    <Table sx={{ minWidth: 100 }} size="small" aria-label="device info table">
      <TableHead>
        <TableRow>
          <TableCell>Device name</TableCell>
          <TableCell>Switch Pin&nbsp;(GPIO)</TableCell>
          <TableCell>Relay Pin&nbsp;(GPIO)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.deviceDetails.devices.map((item: DeviceInfo) => {
          return (
            <TableRow key={item.dName}>
              <TableCell>
                {item.dType === "switchJSON" ? (
                  <Chip
                    icon={<PowerIcon fontSize="small" />}
                    label={item.dName}
                    color={item.cState ? "success" : "default"}
                  />
                ) : item.dType === "lightJSON" ? (
                  <LightbulbIcon />
                ) : (
                  <SportsVolleyballIcon />
                )}
              </TableCell>
              <TableCell>{item.sPin}</TableCell>
              <TableCell>{item.rPin}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default DeviceTable;
