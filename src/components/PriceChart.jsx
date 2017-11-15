import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './PriceChart.css';

const PriceChart = (props) => (
  <div className={styles.container}>
    <LineChart width={800} height={450} data={props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="scale" minTickGap={30} />
      <YAxis label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip />
      <Line type="monotone" dataKey="Price (USD)" stroke="#8884d8" dot={false} />
    </LineChart>
  </div>
);

export default PriceChart;
