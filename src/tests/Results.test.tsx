import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultsAPI } from '../components/Results';
import '@testing-library/jest-dom';

test('displays "No cards available" message when no cards are present', () => {
  jest.spyOn(React, 'useContext').mockReturnValue({ results: [] });

  const { getByText } = render(<ResultsAPI />);

  expect(getByText('No cards available')).toBeInTheDocument();
});

test('renders the specified number of cards', async () => {
  const mockResults = [
    {
      url: '1',
      name: 'Card 1',
      image: 'image1.jpg',
      species: 'Species 1',
      status: 'Status 1',
      location: { name: 'Location 1' },
    },
    {
      url: '2',
      name: 'Card 2',
      image: 'image2.jpg',
      species: 'Species 2',
      status: 'Status 2',
      location: { name: 'Location 2' },
    },
    {
      url: '3',
      name: 'Card 3',
      image: 'image3.jpg',
      species: 'Species 3',
      status: 'Status 3',
      location: { name: 'Location 3' },
    },
  ];

  jest.spyOn(React, 'useContext').mockReturnValue({ results: mockResults });

  render(<ResultsAPI />);

  const cards = screen.getAllByTestId('result-card');

  expect(cards).toHaveLength(3);
});
