interface IStory {
  content: string;
}

interface Ifeed {
  count: number;
  feeds: Story[];
}

interface FeedProps {
  page: number;
  size: number;
  sort: string;
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
  updated_at: string;
  content: string;
};
