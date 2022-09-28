export type StoryThumbnail = {
  id: number;
  created_at: string;
  content: string;
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
};

export type StoryBoardProps = {
  value: string;
};

export type CategoryProps = {
  category: boolean;
  categoriesList: string[];
  toggleCategory: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export type TagProps = {
  tag: boolean;
  tagsList: string[];
  toggleTag: (event: React.KeyboardEvent | React.MouseEvent) => void;
};
