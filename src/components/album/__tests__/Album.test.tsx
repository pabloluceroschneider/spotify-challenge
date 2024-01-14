/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Album } from '..';
import { data } from '@/mocks/album-list.mock';

describe('Album', () => {
  let props = { ...data };

  it('renders an album', () => {
    const { baseElement } = render(<Album {...props} />);

    expect(baseElement).toMatchSnapshot();
  });
});
