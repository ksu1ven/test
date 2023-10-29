const setLocalStorageItem = (nameItem: string, item: string) => {
  localStorage.setItem(nameItem, item);
};

const getLocalStorageItem = (nameItem: string) => {
  try {
    const item = localStorage.getItem(nameItem) ?? "";
    return item;
  } catch {
    return "";
  }
};

export { setLocalStorageItem, getLocalStorageItem };
