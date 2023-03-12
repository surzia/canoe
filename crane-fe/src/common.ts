export const BACKEND_API_HOST = process.env.REACT_APP_BACKEND_POINT;

export const goto = (path: string) => {
  window.location.href = path;
};

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const intro = {
  cnName: "千纸鹤写作",
  enName: "Papercrane writer",
  cnDesc: "随时随地随意记录故事",
  enDesc: "Write your story in papercrane. Anywhere. Anytime. Anyway.",
};

export const setLoginState = (status: boolean) => {
  localStorage.setItem("login", JSON.stringify(status));
};
