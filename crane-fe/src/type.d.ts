interface IStory {
  content: string;
  days: number[];
}

interface Ifeed {
  records: number;
  count: number;
  feeds: Story[];
}

interface FeedProps {
  page: number;
  size: number;
  sort: string;
  word: string;
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
  updated_at: string;
  content: string;
  images: string[];
};

type Sync = {
  login: boolean;
  uploadLoading: boolean;
  downloadLoading: boolean;
  loading: boolean;
};

type SaveSyncReq = {
  type: string;
  username: string;
  password: string;
};

type SyncReq = {
  type: string;
  sid: string;
};

type SyncAllReq = {
  type: string;
};
