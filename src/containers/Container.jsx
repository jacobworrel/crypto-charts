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
    const timeRange = this.getTimeRange();
    this.getData(timeRange);
  }

  getTimeRange = (start, end) => {
    // default time range will be to show past year
    if (!start) start = moment().subtract(1, 'years');
    if (!end) end = moment();
    // invoke getPeriod() to get candlestick period
    const period = this.getPeriod(start, end);
    return { start, end, period };
  }

  // gets candlestick period based on whether timeRange is a year, a month, a week or a day
  // this determines how many priceData points will go into chart
  getPeriod(start, end) {
    const diff = end.diff(start, 'days');
    let period;
    if (diff > 1 && diff <= 14) period = 1800;
    else if (diff > 14 && diff <= 186) period = 7200;
    else if (diff > 186) period = 86400;
    else period = 300;
    console.log('diff -->', diff);
    console.log('period -->', period);
    return period;
  }

  // handles logic to change start date with buttons in DateRange component
  changeStartDate = (e) => {
    let startDate;
    let endDate;
    if (e.target.nodeName === 'INPUT') {
      startDate = moment(e.target.value);
      endDate = moment(this.state.endDate);
    } else {
      const activeBtnLabel = e.target.textContent;
      switch(activeBtnLabel) {
        case '1y': {
          startDate = moment().subtract(1, 'years');
          endDate = moment();
          break;
        }
        case '1m': {
          startDate = moment().subtract(1, 'months');
          endDate = moment();
          break;
        }
        case '7d': {
          startDate = moment().subtract(1, 'weeks');
          endDate = moment();
          break;
        }
        case '1d': {
          startDate = moment().subtract(1, 'days');
          endDate = moment();
          break;
        }
      }
      // update active button
      this.setState({ activeBtnLabel });
    }
    // calculate new time range with new start date
    const timeRange = this.getTimeRange(startDate, endDate);
    // invoke getData() with new time range to get new price data
    this.getData(timeRange);
  }

  changeEndDate = (e) => {
    const startDate = moment(this.state.startDate);
    let endDate;
    if (e.target.nodeName === 'INPUT') {
      endDate = moment(e.target.value);
    }
    // calculate new time range with new end date
    const timeRange = this.getTimeRange(startDate, endDate);
    // invoke getData() with new time range to get new price data
    this.getData(timeRange);
  }

  // fetches price data from Poloniex API
  async getData(timeRange) {
    // variables required to fetch price data
    const { symbol } = this.state.currCrypto;
    const { start, end, period } = timeRange;
    // format start and end dates to unix timestamp for API request
    const startUnix = start.unix();
    const endUnix = end.unix();
    // format start and end dates to domString for HTML5 date input
    const startString = start.format('YYYY-MM-DD');
    const endString = end.format('YYYY-MM-DD');

    console.log('startString -->', startString);
    console.log('endString -->', endString);

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

  // handles logic to format date scales on XAxis
  formatDateScales = (date) => {
    switch(this.state.activeBtnLabel) {
      case '1y': {
        return moment.unix(date).format('MMM YYYY');
      }
      case '1m' || '7d': {
        return moment.unix(date).format('MMM Do');
      }
      case '1d': {
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
          changeStartDate={this.changeStartDate}
          changeEndDate={this.changeEndDate}
          clickHandler={this.changeStartDate}
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
