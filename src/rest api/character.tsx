import { API_URL } from '../constants/api';

export const fetchCharacter = (userInput: string) => {
  const url = userInput.trim() ? `${API_URL}${userInput}` : API_URL;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    return response.json();
  });
};
