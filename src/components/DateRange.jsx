import React from 'react';
import styles from './DateRange.css';

const DateRange = (props) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={() => props.getData('days')}>1d</button>
    <button className={styles.button} onClick={() => props.getData('weeks')}>7d</button>
    <button className={styles.button} onClick={() => props.getData('months')}>1m</button>
    <button className={styles.button} onClick={() => props.getData('years')}>1y</button>
  </div>
);

export default DateRange;
