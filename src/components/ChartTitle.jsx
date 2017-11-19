import React from 'react';
import styles from './ChartTitle.css';

/**
* @function ChartTitle
* @description React component that renders header with selected crypto currency's name and symbol.
*/

const ChartTitle = props => (
  <div className={styles.container}>
    <h2>{`${props.cryptoName} (${props.cryptoSymbol})`}</h2>
  </div>
);

export default ChartTitle;
