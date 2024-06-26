const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, value);
};

const lookInSession = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    return item;
  } catch (error) {
    console.error("Error accessing session storage", error);
    return null;
  }
  // console.log(sessionStorage.getItem(key));
  // return sessionStorage.getItem(key);
};

const removeFromSession = (key) => {
  return sessionStorage.removeItem(key);
};

const logOutUser = () => {
  return sessionStorage.clear();
};

export { storeInSession, lookInSession, removeFromSession, logOutUser };
