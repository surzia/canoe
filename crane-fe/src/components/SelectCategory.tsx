import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SelectCategoryProps } from "../conf/type";

function SelectCategory({
  open,
  selectedCategory,
  handleSelectedCategoryChange,
  categoryOptions,
  close,
}: SelectCategoryProps) {
  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogTitle>设置分类</DialogTitle>
      <DialogContent>
        <DialogContentText>选择一个分类，支持自动补全</DialogContentText>
        <Autocomplete
          disablePortal
          value={categoryOptions[selectedCategory]}
          onChange={handleSelectedCategoryChange}
          id="category-auto-select"
          options={categoryOptions}
          sx={{ m: 1, height: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="分类" fullWidth />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>确定</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SelectCategory;
