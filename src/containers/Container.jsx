import React, { Component } from 'react';
import moment from 'moment';
import Menu from './../components/Menu';
import PriceChart from './../components/PriceChart';

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      priceData: [],
      activeBtnLabel: '1y',
      currCrypto: {
        name: 'Ethereum',
        symbol: 'ETH'
      },
      cryptos: [
        { name: 'Ethereum', symbol: 'ETH' },
        { name: 'Bitcoin', symbol: 'BTC' },
        { name: 'Ripple', symbol: 'XRP' },
        { name: 'Litecoin', symbol: 'LTC' },
        { name: 'Dash', symbol: 'DASH' },
        { name: 'Monero', symbol: 'XMR' },
        { name: 'Stellar', symbol: 'STR' },
        { name: 'Ethereum Classic', symbol: 'ETC' },
        { name: 'Zcash', symbol: 'ZEC' },
        { name: 'Augur', symbol: 'REP' },
        { name: 'Nxt', symbol: 'NXT' }
      ]
    }
  }

  componentDidMount() {
    this.getData('years');
  }

  // fetches price data from Poloniex API
  async getData(timeRange) {
    const { symbol } = this.state.currCrypto;
    // get start and end dates with moment.js
    const start = moment().subtract(1, timeRange);
    const end = moment();
    // format date to unix timestamp for API request
    const startUnix = start.unix();
    const endUnix = end.unix();
    // format date to domString for HTML5 date input
    const startString = start.format('YYYY-MM-DD');
    const endString = end.format('YYYY-MM-DD');

    // invoke getPeriod() to get candlestick period
    const period = this.getPeriod(timeRange);
    // fetch price priceData from Poloniex API, passing in appropriate start, end and period values
    const url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${symbol}&start=${startUnix}&end=${endUnix}&period=${period}`
    const response = await fetch(url);
    const json = await response.json();
    // parse json to only include values we need (closing price, date and label for XAxis ticks)
    const priceData = json.map(item => {
      const { date, close } = item;
      // get label for XAxis ticks based on whether timeRange is a year, a month, a week or a day
      return { 'Price (USD)': close, date };
    });
    this.setState({ priceData, timeRange, startDate: startString, endDate: endString });
  }

  // gets candlestick period based on whether timeRange is a year, a month, a week or a day
  // this determines how many priceData points will go into chart
  getPeriod(timeRange) {
    switch(timeRange) {
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

  // handles logic to format date scales on XAxis
  formatDateScales = (date) => {
    switch(this.state.timeRange) {
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
  // formats date label in tooltip to show more exact date/time
  formatTooltipLabel = (date) => {
    return moment.unix(date).format('MMMM Do YYYY, h:mm a');
  }

  // handles logic to change time range in chart
  changeTimeRange = (e) => {
    let timeRange;
    const activeBtnLabel = e.target.textContent;
    switch(activeBtnLabel) {
      case '1y': {
        timeRange = 'years';
        break;
      }
      case '1m': {
        timeRange = 'months';
        break;
      }
      case '7d': {
        timeRange = 'weeks';
        break;
      }
      case '1d': {
        timeRange = 'days';
        break;
      }
    }
    // invoke getData() with new date range to get new price data
    this.getData(timeRange);
    // update active button
    this.setState({ activeBtnLabel });
  }

  changeCrypto = (e) => {
    const symbol = e.target.textContent;
    const name = this.state.cryptos.reduce((acc, curr) => {
      return curr.symbol === symbol ? curr.name : acc;
    }, '');
    // change currCrypto to the one user clicked on and reset active button in this.state
    // after setState has finished and these variables have been changed, invoke getData() to fetch new priceData from API
    this.setState(
      { currCrypto: { name, symbol }, activeBtnLabel: '1y' },
      () => this.getData('years')
    );
  }

  render() {
    return (
      <div>
        <Menu
          cryptos={this.state.cryptos}
          clickHandler={this.changeCrypto}
          activeBtn={this.state.currCrypto.symbol}
        />
        <PriceChart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          priceData={this.state.priceData}
          clickHandler={this.changeTimeRange}
          formatDateScales={this.formatDateScales}
          formatTooltipLabel={this.formatTooltipLabel}
          activeBtn={this.state.activeBtnLabel}
          cryptoName={this.state.currCrypto.name}
          cryptoSymbol={this.state.currCrypto.symbol}
        />
      </div>
    );
  }
}

export default Container;
