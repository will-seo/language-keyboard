import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import KeyboardPage from '../pages/[keyboard]';
import { getLanguageContext } from '../utils/context';

describe('keyboard page', () => {
  const props = getLanguageContext('japanese');

  it('renders', () => {
    render(<KeyboardPage {...props} />);
  });

  it('renders h1', () => {
    render(<KeyboardPage {...props} />);
    const h1 = screen.getByText('Online Japanese Keyboard');
    console.log(h1.tagName);
    expect(h1).toBeInTheDocument();
  });
});
