import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartTitle from './ChartTitle';
import DateRange from './DateRange';
import ErrorMessage from './ErrorMessage';
import styles from './PriceChart.css';

const PriceChart = props => (
  <div className={styles.container}>
    <div>
      <ChartTitle
        cryptoName={props.cryptoName}
        cryptoSymbol={props.cryptoSymbol}
      />
      <DateRange
        startDate={props.startDate}
        endDate={props.endDate}
        activeBtn={props.activeBtn}
        changeStartDate={props.changeStartDate}
        changeEndDate={props.changeEndDate}
        clickHandler={props.clickHandler}
      />
      {props.invalidDateRange ? (
        <ErrorMessage />
      ) : (
        <LineChart
          width={props.width}
          height={props.height}
          data={props.priceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            padding={{ left: 10 }}
            minTickGap={30}
            tickFormatter={props.formatDateScales}
          />
          <YAxis
            type="number"
            domain={['auto', 'auto']}
            label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip labelFormatter={props.formatTooltipLabel} />
          <Line
            type="monotone"
            dataKey="Price (USD)"
            stroke="#8884d8"
            isAnimationActive={false}
            dot={false}
          />
        </LineChart>
      )}
    </div>
  </div>
);

export default PriceChart;
