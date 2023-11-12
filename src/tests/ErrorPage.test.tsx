import { render } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page';
import '@testing-library/jest-dom';

describe('ErrorPage component', () => {
  it('displays the 404 page for invalid routes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/invalid']} initialIndex={0}>
        <Routes>
          <Route path="/invalid" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      getByText('This page was not found, return to the')
    ).toBeInTheDocument();
  });
});
