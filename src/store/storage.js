import SecureLS from "secure-ls";

const secureLS = new SecureLS();

export const setItem = (key, value) => {
  secureLS.set(key, value);
};

export const getItem = (key) => {
  return secureLS.get(key);
};

export const clear = () => {
  localStorage.clear();
};
