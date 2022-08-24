import postDb from "./db";

const getPosts = () => {
  new Promise((resolve, reject) => {
    if (!postDb) {
      return setTimeout(() => reject(new Error("Posts not found")), 250);
    }

    setTimeout(() => resolve(Object.values(postDb)), 250);
  });
};

const getPostById = (id) => {
  new Promise((resolve, reject) => {
    const post = postDb[id];

    if (!post) {
      return setTimeout(() => reject(new Error("User not found")), 250);
    }
    setTimeout(() => resolve(post), 250);
  });
};

export { getPosts, getPostById };
