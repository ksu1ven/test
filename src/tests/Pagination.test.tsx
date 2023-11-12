import { render, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    const onPageChangeMock = jest.fn();
    const onPageSizeChangeMock = jest.fn();

    const { getByText } = render(
      <Pagination
        currentPage={2}
        pageSize={10}
        totalResults={100}
        onPageChange={onPageChangeMock}
        onPageSizeChange={onPageSizeChangeMock}
      />
    );

    fireEvent.click(getByText('Prev'));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);

    fireEvent.click(getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
