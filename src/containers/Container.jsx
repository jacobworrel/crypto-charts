import React, { Component } from 'react';
import moment from 'moment';
import PriceChart from './../components/PriceChart';

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getData('years');
  }

  async getData(range) {
    const start = moment().subtract(1, range).unix();
    const end = moment().unix();
    const period = range === 'years' ? 86400 : 14400;
    // fetch price data from Poloniex, passing in appropriate start, end and period values
    const url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=${start}&end=${end}&period=${period}`
    const response = await fetch(url);
    const json = await response.json();
    // parse json to only include values we need (price and date)
    const data = json.map(day => {
      // add conditional logic here
      const scale = moment.unix(day.date).format('MMM YYYY');
      return { 'Price (USD)': day.close, date: day.date, scale };
    });
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <h1>Crypto Charts</h1>
        <PriceChart data={this.state.data} />
      </div>
    );
  }
}

export default Container;
