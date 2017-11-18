import React from 'react';
import Button from './Button';
import styles from './DateRange.css';

const DateRange = (props) => {
  // map over labels array to create date range buttons
  const labels = ['1d', '7d', '1m', '1y'];
  const buttons = labels.map(label => (
    <Button
      key={label}
      className={props.className}
      clickHandler={props.clickHandler}
      label={label}
      activeBtn={props.activeBtn}
    />
  ));
  return (
    <div className={styles.container}>
      <div>
        {buttons}
      </div>
      <form className={styles.form}>
        <label htmlFor="startDate" className={styles.label}>From</label>
        <input id="startDate" type="date" value={props.startDate} onChange={props.changeStartDate} />
        <label htmlFor="endDate" className={styles.label}>To</label>
        <input id="endDate" type="date" value={props.endDate} onChange={props.changeEndDate} />
      </form>
    </div>
  );
}

export default DateRange;
