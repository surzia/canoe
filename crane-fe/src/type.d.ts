interface IStory {
  content: string;
}

interface ISearch {
  sid: string;
  hit: string;
  text: string;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface StoryBookProps {
  submitStory(): void;
}

interface SearchProps {
  search(keyword: string): void;
}

interface NavProps {
  page: string;
  id: string;
  refer: RefObject<StoryBookProps>;
}

type Story = {
  sid: string;
  created_at: string;
  content: string;
};
