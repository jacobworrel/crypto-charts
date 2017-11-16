import React, { Component } from 'react';
import moment from 'moment';
import PriceChart from './../components/PriceChart';

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      range: ''
    }
    this.getData = this.getData.bind(this);
    this.formatDateScales = this.formatDateScales.bind(this);
    this.formatTooltipLabel = this.formatTooltipLabel.bind(this);
  }

  componentDidMount() {
    this.getData('years');
  }

  async getData(range) {
    const start = moment().subtract(1, range).unix();
    const end = moment().unix();
    // get candlestick period based on whether range is a year, a month, a week or a day
    // this determines how many data points will go into chart
    const period = this.getPeriod(range);
    // fetch price data from Poloniex API, passing in appropriate start, end and period values
    const url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=${start}&end=${end}&period=${period}`
    const response = await fetch(url);
    const json = await response.json();
    // parse json to only include values we need (closing price, date and label for XAxis ticks)
    const data = json.map(item => {
      const { date } = item;
      // round closing price to two decimals
      const close = +item.close.toFixed(2);
      // get label for XAxis ticks based on whether range is a year, a month, a week or a day
      return { 'Price (USD)': close, date };
    });
    this.setState({ data, range });
  }

  getPeriod(range) {
    switch(range) {
      case 'years': {
        return 86400;
      }
      case 'months': {
        return 7200;
      }
      case 'weeks': {
        return 1800;
      }
      case 'days': {
        return 300;
      }
      default:
        return 1800;
    }
  }

  formatDateScales(date) {
    switch(this.state.range) {
      case 'years': {
        return moment.unix(date).format('MMM YYYY');
      }
      case 'months' || 'weeks': {
        return moment.unix(date).format('MMM Do');
      }
      case 'days': {
        return moment.unix(date).format('h a');;
      }
      default:
        return moment.unix(date).format('MMM Do');
    }
  }

  formatTooltipLabel(date) {
    return moment.unix(date).format('MMMM Do YYYY, h:mm a');
  }

  render() {
    return (
      <div>
        <h1>Crypto Charts</h1>
        <PriceChart data={this.state.data} getData={this.getData} formatDateScales={this.formatDateScales} formatTooltipLabel={this.formatTooltipLabel} />
      </div>
    );
  }
}

export default Container;
