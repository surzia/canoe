import { SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export type StoryThumbnail = {
  id: number;
  created_at: string;
  content: string;
};

export type CategoryItem = {
  key: string;
  name: string;
  created: string;
};

export type StoryListProps = {
  open: boolean;
  storyList: StoryThumbnail[];
  page: number;
  count: number;
  toggleStoryList: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  viewStory: (id: number) => void;
};

export enum State {
  ReadMode,
  EditMode,
}

export type StoryProps = {
  mode: State;
  categoryOptions: string[];
  tagOptions: string[];
  changeMode: () => void;
  value: string;
  handleStoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  viewStory: (id: number) => void;
  storyCategory: number;
  handleSelectedCategoryChange: (event: any, newValue: string | null) => void;
  storyTags: number[];
  handleSelectedTagsChange: (event: SelectChangeEvent<string[]>) => void;
};

export type StoryBoardProps = {
  value: string;
  storyCategory: number;
  storyTags: number[];
};

export type SettingProps = {
  setting: boolean;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
  mode: string;
  toggleDarkMode: () => void;
};

export type CategoryProps = {
  category: boolean;
  categoriesList: CategoryItem[];
  setCategoriesList: Dispatch<SetStateAction<CategoryItem[]>>;
  toggleCategory: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export interface HeadCell {
  id: keyof CategoryItem;
  label: string;
}

export type TagProps = {
  tag: boolean;
  tagsList: string[];
  toggleTag: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export type SideNavProps = {
  text: string;
};

export type OrderProps = "asc" | "desc";

export type SearchResult = {
  id: number;
  hit: string;
  text: string;
};

export enum CategoryToolbarState {
  RawText,
  Created,
  Selected,
}

export type SelectCategoryProps = {
  open: boolean;
  selectedCategory: number;
  handleSelectedCategoryChange: (event: any, newValue: string | null) => void;
  categoryOptions: string[];
  close: () => void;
};

export type SelectTagsProps = {
  open: boolean;
  close: () => void;
  tagOptions: string[];
  storyTags: number[];
  handleSelectedTagsChange: (event: SelectChangeEvent<string[]>) => void;
};
