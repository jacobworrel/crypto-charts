import React from 'react';
import styles from './ErrorMessage.css';

const ErrorMessage = props => (
  <div className={styles.container}>
    <img src="./assets/img/error-state.png" />
    <p>Oops! Looks like your end date is earlier than your start date...</p>
  </div>
);

export default ErrorMessage;
