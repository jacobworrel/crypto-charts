import React from 'react';
import styles from './ChartTitle.css';

const ChartTitle = (props) => (
  <div className={styles.container}>
    <img className={styles.thumbnail} src="./assets/img/ethereum-thumbnail.png" alt="Ethereum Logo" />
    <h2>{props.title}</h2>
  </div>
);

export default ChartTitle;
