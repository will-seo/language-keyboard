import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSXElementConstructor, ReactElement } from 'react';
import KeyboardPage from '../pages/[keyboard]';
import { getLanguageContext } from '../utils/context';

const setup = (tsx: ReactElement<any, string | JSXElementConstructor<any>>) => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};

describe('Japanese keyboard', () => {
  const props = getLanguageContext('japanese');

  const convert = [
    ['nwarayamahanatasakaapabadazaga', 'んわらやまはんあたさかあぱばだざが'],
    ['rimihinichishikiipibidijigi', 'りみひんいちしきいぴびぢじぎ'],
    ['SHOU', 'しょう'],
    ['NANI', 'なに'],
    ['HIRAGANA', 'ひらがな'],
    ['RINGO', 'りんご'],
    ['GENKI', 'げんき'],
    ['SHOUNEN', 'しょうねん'],
  ];

  test('render', () => {
    render(<KeyboardPage {...props} />);
  });

  test('render heading', () => {
    render(<KeyboardPage {...props} />);
    const heading = screen.getByText('Online Japanese Keyboard');
    expect(heading).toBeInTheDocument();
  });

  test.each(convert)('.convert(%s)', async (text, expected) => {
    const { user } = setup(<KeyboardPage {...props} />);
    await user.keyboard(text);
    const textarea = screen.getByRole('textbox', { name: 'Input Method Editor' });
    expect(textarea).toHaveDisplayValue(expected);
  });
});
