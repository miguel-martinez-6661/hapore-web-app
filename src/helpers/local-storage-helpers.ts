export const getStoredUser = () => {
  if (!!localStorage) {
    const storageUser = localStorage.getItem("user");
    return storageUser ? JSON.parse(storageUser) : null;
  }
};
