import buttonStyles from '../styles/Button.module.css';

interface CapslockButtonProps {
  isUppercase: boolean;
  forceUppercase: boolean;
  handleChange: (newForceUppercase: boolean) => void;
}

const CapslockButton = (props: CapslockButtonProps) => {
  const { isUppercase, forceUppercase, handleChange } = props;
  return (
    <div className={buttonStyles.toggle}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.toggleButton}`}
        data-active={forceUppercase}
        onClick={() => {
          handleChange(!forceUppercase);
        }}
      >
        {isUppercase ? 'Caps on' : 'Caps off'}
      </button>
    </div>
  );
};

export default CapslockButton;
