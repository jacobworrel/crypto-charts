import React from 'react';
import styles from './Button.css';

/**
* @function Button
* @description React component that renders a button.
* Displays active class and handles ability to change time range and selected crypto currency.
*/

const Button = props => (
  <button
    className={props.activeBtn === props.label ? `${styles.active} ${styles.button}` : styles.button}
    onClick={props.clickHandler}
  >
    {props.label}
  </button>
);

export default Button;
