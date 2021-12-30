import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useAppSelector } from "../hooks";
import { DeviceTree, Device } from "./types";
import { makeStyles } from "@mui/styles";

interface Props {
}

const useStyles = makeStyles({
  selected: {
    "&.Mui-selected": {
      fontStyle: "italic",
    },
  },
});
const DeviceList = (props: Props) => {
  const classes = useStyles();
  const getFavDevices = () => {
    const favDevices: string[] =
      JSON.parse(localStorage.getItem("favDevices") as string) || [];
    if (favDevices.length === 0) {
      return [];
    } else {
      return favDevices;
    }
  };
  const [selected, setSelected] = React.useState<string[]>(getFavDevices());
  const devices = useAppSelector((state) => state.devices);
  const rList: DeviceTree = devices.reduce((a: any, curr: any) => {
    if (!a[curr.rName]) {
      a[curr.rName] = [];
    }
    a[curr.rName].push(curr);
    return a;
  }, {});

  const renderList = (device: DeviceTree) => {
    let buffer = [];
    for (const key in device) {
      buffer.push(
        <TreeItem key={key} nodeId={key} label={key.toLocaleLowerCase()}>
          {renderDevices(device[key])}
        </TreeItem>
      );
    }
    return buffer;
  };

  const renderDevices = (devices: Device[]) => {
    return devices.map((e: Device) => {
      return (
        <TreeItem
          key={e.id}
          nodeId={e.id}
          label={e.dName.toLowerCase()}
          classes={{ selected: classes.selected }}
        />
      );
    });
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    if (nodeIds[0].match("/")) {
      setSelected((prevState: string[]) => {
        const isPresent = prevState.includes(nodeIds[0]);
        if (isPresent) {
          const index = prevState.indexOf(nodeIds[0]);
          if (index > -1) {
            prevState.splice(index, 1);
          }
          const latestItems = [...prevState];
          localStorage.setItem("favDevices", JSON.stringify(latestItems));
          return latestItems;
        } else {
          const latestItems = [...nodeIds, ...prevState];
          localStorage.setItem("favDevices", JSON.stringify(latestItems));
          return latestItems;
        }
      });
    }
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selected}
      onNodeSelect={handleSelect}
      multiSelect
      sx={{
        height: "100%",
        maxHeight: "250px",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {renderList(rList)}
    </TreeView>
  );
};



export default DeviceList;
