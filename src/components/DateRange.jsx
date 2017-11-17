import React from 'react';
import styles from './DateRange.css';

const DateRange = (props) => (
  <div className={styles.container}>
    <button
      className={props.activeBtn === 'days' ? `${styles.active} ${styles.button}` : styles.button}
      onClick={() => props.handleClick('days')}>
      1d
    </button>
    <button
      className={props.activeBtn === 'weeks' ? `${styles.active} ${styles.button}` : styles.button}
      onClick={() => props.handleClick('weeks')}>7d</button>
    <button
      className={props.activeBtn === 'months' ? `${styles.active} ${styles.button}` : styles.button}
      onClick={() => props.handleClick('months')}>1m</button>
    <button
      className={props.activeBtn === 'years' ? `${styles.active} ${styles.button}` : styles.button}
      onClick={() => props.handleClick('years')}>1y</button>
  </div>
);

export default DateRange;
