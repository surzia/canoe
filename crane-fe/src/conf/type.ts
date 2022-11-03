export type StoryThumbnail = {
  id: number;
  created_at: string;
  content: string;
};

export type ToolboxProps = {
  toggleStoryList: (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
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
  changeMode: () => void;
  value: string;
  handleStoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  viewStory: (id: number) => void;
};

export type StoryBoardProps = {
  value: string;
};

export type SettingProps = {
  setting: boolean;
  toggleSetting: (event: React.KeyboardEvent | React.MouseEvent) => void;
  mode: string;
  toggleDarkMode: () => void;
};

export type SideNavProps = {
  text: string;
};

export type SearchResult = {
  id: number;
  hit: string;
  text: string;
};
