import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import { ToolboxProps } from "../conf/type";

function Toolbox({ toggleStoryList, toggleSetting }: ToolboxProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        transform: "translateZ(0px)",
        bottom: 50,
        right: 50,
      }}
      component="footer"
    >
      <SpeedDial ariaLabel="Toolbox" icon={<SpeedDialIcon />}>
        <SpeedDialAction
          key="story"
          icon={<ArticleIcon />}
          tooltipTitle="story"
          onClick={toggleStoryList}
        />
        <SpeedDialAction
          key="设置"
          icon={<SettingsIcon />}
          tooltipTitle="设置"
          onClick={toggleSetting}
        />
      </SpeedDial>
    </Box>
  );
}

export default Toolbox;
