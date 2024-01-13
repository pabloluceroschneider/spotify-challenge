/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from '..';

describe('SearchForm', () => {
  const onChange = jest.fn();

  let props = {
    onChange,
  };

  it('searchs Parachutes album of Coldplay', () => {
    render(<SearchForm {...props} />);

    const inputQ = screen.getByTestId('q-input');
    const inputYear = screen.getByTestId('year-input');

    fireEvent.change(inputQ, { target: { value: 'Coldplay' } });
    fireEvent.change(inputYear, { target: { value: '2000' } });

    expect(onChange).toHaveBeenCalled();
  });
});
