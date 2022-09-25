import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import AppsIcon from "@mui/icons-material/Apps";
import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  toggleStoryList: (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleCategory: (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleTag: (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Toolbox({
  toggleStoryList,
  toggleCategory,
  toggleTag,
  toggleSetting,
}: Props) {
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
          key="分类"
          icon={<AppsIcon />}
          tooltipTitle="分类"
          onClick={toggleCategory}
        />
        <SpeedDialAction
          key="标签"
          icon={<SellIcon />}
          tooltipTitle="标签"
          onClick={toggleTag}
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
