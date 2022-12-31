interface IStory {
  content: string;
}

interface StoryBookProps {
  submitStory(): void;
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
