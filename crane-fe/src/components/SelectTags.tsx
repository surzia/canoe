import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { SelectTagsProps } from "../conf/type";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  selectedTags: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedTags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectTags({ open, close, tagOptions }: SelectTagsProps) {
  const theme = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogTitle>设置标签</DialogTitle>
      <DialogContent sx={{ m: 1, height: 300 }}>
        <DialogContentText>选择多个分类</DialogContentText>
        <Select
          id="tags-multiple-select"
          fullWidth
          multiple
          value={selectedTags}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tagOptions.map((tag, idx) => (
            <MenuItem
              key={idx}
              value={tag}
              style={getStyles(tag, selectedTags, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectTags;
