import { faAnglesUp, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import buttonStyles from '../styles/Button.module.css';
import { LanguageModeProcessed } from '../types';
interface ModifierSwitcherProps {
  currentMode: LanguageModeProcessed;
  shiftKeyOverride: boolean;
  capsLockKeyOverride: boolean;
  handleChangeShift: (status: boolean) => void;
  handleChangeCapsLock: (status: boolean) => void;
}

const ModifierSwitcher = (props: ModifierSwitcherProps) => {
  const { currentMode, shiftKeyOverride, capsLockKeyOverride, handleChangeShift, handleChangeCapsLock } = props;
  if (!currentMode.shift && !currentMode.capsLock) return null;
  return (
    <div className={buttonStyles.toggle}>
      {currentMode.shift && (
        <button
          className={`${buttonStyles.button} ${buttonStyles.iconButton}`}
          data-active={shiftKeyOverride}
          onClick={() => {
            handleChangeShift(!shiftKeyOverride);
            handleChangeCapsLock(false);
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} /> Shift
        </button>
      )}
      {currentMode.capsLock && (
        <button
          className={`${buttonStyles.button} ${buttonStyles.iconButton}`}
          data-active={capsLockKeyOverride}
          onClick={() => {
            handleChangeCapsLock(!capsLockKeyOverride);
            handleChangeShift(false);
          }}
        >
          <FontAwesomeIcon icon={faAnglesUp} /> Caps
        </button>
      )}
    </div>
  );
};

export default ModifierSwitcher;
