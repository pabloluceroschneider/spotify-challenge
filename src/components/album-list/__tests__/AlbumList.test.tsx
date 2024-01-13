/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AlbumList } from '..';
import { data } from '@/mocks/album-list.mock';

describe('AlbumList', () => {
  let props = { ...data };

  it('renders a song detail', () => {
    const { baseElement } = render(<AlbumList {...props} />);

    expect(baseElement).toMatchSnapshot();
  });
});
