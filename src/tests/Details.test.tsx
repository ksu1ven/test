import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Details } from '../components/Details';
import { Results } from '../types/interface';

jest.mock('node-fetch');

const characterDetails: Results = {
  url: 'character-url',
  id: 1,
  name: 'Character Name',
  image: 'character-image-url',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
  episode: [],
  type: 'character-type',
  location: {
    name: 'Location Name',
  },
};

describe('Details component', () => {
  it('displays a loading indicator while fetching data', async () => {
    jest.spyOn(global, 'fetch').mockReturnValue(new Promise(() => {}));

    render(<Details characterDetails={characterDetails} onClose={() => {}} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByText('Loading...')).toBeNull();
  });

  it('correctly displays detailed card data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(characterDetails),
    });

    render(<Details characterDetails={characterDetails} onClose={() => {}} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Character Name')).toBeInTheDocument();
    expect(screen.getByText('Status: Alive')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
  });
});
