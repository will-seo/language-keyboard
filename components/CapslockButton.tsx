import styles from '../styles/Toggle.module.css';

interface CapslockButtonProps {
  isUppercase: boolean;
  forceUppercase: boolean;
  handleChange: (newForceUppercase: boolean) => void;
}

const CapslockButton = (props: CapslockButtonProps) => {
  const { isUppercase, forceUppercase, handleChange } = props;
  return (
    <div className={styles.toggle}>
      <button
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
