import buttonStyles from '../styles/Button.module.css';

interface ModifierButtonProps {
  modifier: boolean;
  modifierOverride: boolean;
  modifierOnText: string;
  modifierOffText: string;
  handleChange: (status: boolean) => void;
}

const ModifierButton = (props: ModifierButtonProps) => {
  const { modifier, modifierOverride, modifierOnText, modifierOffText, handleChange } = props;
  return (
    <div className={buttonStyles.toggle}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.toggleButton}`}
        data-active={modifierOverride}
        onClick={() => {
          handleChange(!modifierOverride);
        }}
      >
        {modifier || modifierOverride ? modifierOnText : modifierOffText}
      </button>
    </div>
  );
};

export default ModifierButton;
