import React from 'react';
import Button from './Button';
import styles from './DateRange.css';

const DateRange = (props) => {
  const labels = ['1d', '7d', '1m', '1y'];
  const buttons = labels.map((label, i) => {
    return (
      <Button
        key={i}
        className={props.className}
        clickHandler={props.clickHandler}
        label={label}
        activeBtn={props.activeBtn}
      />
    )
  });
  return (
    <div className={styles.container}>
      {buttons}
    </div>
  );
}

export default DateRange;
