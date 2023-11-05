import { API_Pages, API_URL, Get_Character } from '../constants/api';

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

export const fetchDetails = (characterId: number) => {
  const url = `${Get_Character}${characterId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
