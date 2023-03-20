interface Story {
  sid: string;
  created_at: string;
  paragraph: Paragraph[];
  days: number[];
}

interface Paragraph {
  pid: string;
  sequence: number;
  data: string;
  typo: FancyTypo;
}

interface Image {
  sid: string;
  filename: string;
}

interface ImageList {
  list: Image[];
}

interface StoryFeed {
  sid: string;
  created_at: string;
  updated_at: string;
  content: string;
  images: string[];
}

interface Ifeed {
  records: number;
  count: number;
  feeds: StoryFeed[];
}

interface StoryYear {
  year: number;
  count: number;
}

interface Charts {
  bar: StoryYear[];
}

interface FeedProps {
  page: number;
  size: number;
  sort: string;
  word: string;
}

interface NavProps {
  page: string;
  id: string;
}

interface ViewProps {
  paragraph: Paragraph;
}

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
