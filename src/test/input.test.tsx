import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { CustomContext } from '../context';
import { Input } from '../components/input/Input';
import { Data } from '../types/types';

// Mock the CustomContext values
type CustomContextValues = {
  searchText: string;
  setSearchText: (text: string) => void;
  data: Data | null;
  page: string;
  setPage: (page: string) => void;
};

describe('<Input />', () => {
  const mockSetSearchText = vi.fn() as (text: string) => void;
  const mockSetPage = vi.fn() as (page: string) => void;
  const mockLocalStorageSetItem = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // Helper function to render the component with context
  const renderComponent = () =>
    render(
      <CustomContext.Provider
        value={
          {
            searchText: '',
            setSearchText: mockSetSearchText,
            data: null, // Assuming null is an acceptable initial value
            page: '',
            setPage: mockSetPage,
          } as CustomContextValues
        }
      >
        <Input />
      </CustomContext.Provider>
    );

  it('renders without crashing', () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText('enter a name')).toBeInTheDocument();
  });

  it('updates inputValue on user input', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('enter a name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('calls setSearchText and localStorage.setItem on form submit', () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const input = getByPlaceholderText('enter a name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    fireEvent.click(getByText('search'));
    expect(mockSetSearchText).toHaveBeenCalledWith('John Doe');
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith('name', 'John Doe');
  });
});
