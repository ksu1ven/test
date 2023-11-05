import { API_Pages, API_URL } from '../constants/api';

export const fetchCharacter = (userInput: string) => {
  const url = userInput.trim() ? `${API_URL}${userInput}` : API_URL;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  });
};

export const fetchCharacterByPage = (
  userInput: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const url = `${API_Pages}${page}&pageSize=${pageSize}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  });
};
