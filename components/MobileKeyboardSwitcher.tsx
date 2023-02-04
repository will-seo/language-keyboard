import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import buttonStyles from '../styles/Button.module.css';

interface MobileKeyboardSwitcherProps {
  mobileKeyboard: boolean;
  mobileKeyboardToggle: boolean;
  handleChange: (status: boolean) => void;
}

const MobileKeyboardSwitcher = ({
  mobileKeyboard,
  mobileKeyboardToggle,
  handleChange,
}: MobileKeyboardSwitcherProps) => {
  return (
    <>
      {mobileKeyboardToggle && (
        <div className={`${buttonStyles.toggle} ${buttonStyles.mobileOnly}`}>
          <button
            className={`${buttonStyles.button} ${buttonStyles.iconButton}`}
            data-active={mobileKeyboard}
            onClick={() => handleChange(!mobileKeyboard)}
          >
            <FontAwesomeIcon icon={faKeyboard} />
            Toggle keyboard
          </button>
        </div>
      )}
    </>
  );
};

export default MobileKeyboardSwitcher;
