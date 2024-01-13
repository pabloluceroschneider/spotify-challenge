/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Track } from '..';
import { data } from '@/mocks/tracks.mock';

describe('Track', () => {
  let props = { ...data };

  it('renders a song detail', () => {
    render(<Track {...props} />);

    const artists = screen.getByTestId('artists');

    expect(artists).toBeInTheDocument();
  });
});
