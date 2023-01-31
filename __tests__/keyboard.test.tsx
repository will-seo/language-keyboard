import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KeyboardPage from '../pages/[keyboard]';
import { getLanguageContext } from '../utils/context';

describe('Japanese keyboard', () => {
  const props = getLanguageContext('japanese');

  test('render', () => {
    render(<KeyboardPage {...props} />);
  });

  test('render heading', () => {
    render(<KeyboardPage {...props} />);
    const heading = screen.getByText('Online Japanese Keyboard');
    expect(heading).toBeInTheDocument();
  });
});
