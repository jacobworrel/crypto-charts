import React from 'react';
import styles from './Button.css';

const Button = props => (
  <button
    className={props.activeBtn === props.label ? `${styles.active} ${styles.button}` : styles.button}
    onClick={props.clickHandler}
  >
    {props.label}
  </button>
);

export default Button;
