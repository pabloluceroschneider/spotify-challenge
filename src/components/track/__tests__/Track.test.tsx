import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Track } from '..';
import { data } from './data.mock';

describe('Track', () => {
  let props = { ...data };

  it('renders a song detail', () => {
    render(<Track {...props} />);

    const heading = screen.getByTestId('artists');

    expect(heading).toBeInTheDocument();
  });
});
