export const BACKEND_API_HOST = process.env.REACT_APP_BACKEND_POINT;

export const goto = (path: string) => {
  window.location.href = path;
};

export const github = () => {
  goto("https://github.com/surzia/papercrane");
};

export const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const setLoginState = (status: boolean) => {
  localStorage.setItem("login", JSON.stringify(status));
};
