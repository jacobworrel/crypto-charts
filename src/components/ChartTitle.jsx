import React from 'react';
import styles from './ChartTitle.css';

const ChartTitle = props => (
  <div className={styles.container}>
    <h2>{`${props.cryptoName} (${props.cryptoSymbol})`}</h2>
  </div>
);

export default ChartTitle;
