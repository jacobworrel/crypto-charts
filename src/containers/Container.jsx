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
      timeRange: 'years',
      invalidDateRange: false,
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

  // fetches price data from Poloniex API
  async getData(payload) {
    // variables required to fetch price data
    const { symbol } = this.state.currCrypto;
    const { start, end, period, timeRange } = payload;
    // format start and end dates to unix timestamp for API request
    const startUnix = start.unix();
    const endUnix = end.unix();
    // format start and end dates to domString for HTML5 date input
    const startString = start.format('YYYY-MM-DD');
    const endString = end.format('YYYY-MM-DD');

    // fetch price priceData from Poloniex API, passing in appropriate start, end and period values
    const url = `https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${symbol}&start=${startUnix}&end=${endUnix}&period=${period}`
    const response = await fetch(url);
    const json = await response.json();
    // parse json to only include values we need (closing price, date and label for XAxis ticks)
    const priceData = json.map(item => {
      const { date } = item;
      // format closing price to include only 4 decimals
      const close = +item.close.toFixed(4);
      // get label for XAxis ticks based on whether timeRange is a year, a month, a week or a day
      return { 'Price (USD)': close, date };
    });
    this.setState(
      {
        priceData,
        startDate: startString,
        endDate: endString,
        invalidDateRange: false,
        timeRange
      }
    );
  }

  getTimeRange = (start, end) => {
    // default time range will be to show past year
    if (!start) start = moment().subtract(1, 'years');
    if (!end) end = moment();

    // calculate difference between start and end dates
    const diff = end.diff(start, 'days');
    // period variable will vary based on whether time range is a year, a month, a week or a day
    // this determines how much data to fetch from Poloniex API (ie. how many data points will go into chart)
    let period;
    // timeRange variable will be used to format scales on XAxis
    let timeRange;
    if (diff < 0) {
      this.setState({ invalidDateRange: true });
    } else if (diff > 1 && diff <= 14) {
      period = 1800;
      timeRange = 'weeks';
    } else if (diff > 14 && diff <= 186) {
      period = 7200;
      timeRange = 'months';
    } else if (diff > 186) {
      period = 86400;
      timeRange = 'years';
    } else {
      period = 300;
      timeRange = 'day';
    }
    return { start, end, period, timeRange };
  }

  // handles logic to change start date from buttons and inputs in date range component
  changeStartDate = (e) => {
    let startDate;
    let endDate;
    if (e.target.nodeName === 'INPUT') {
      startDate = moment(e.target.value);
      endDate = moment(this.state.endDate);
      this.setState({ activeBtnLabel: '' });
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

  // handles logic to change end date from inputs in date range component
  changeEndDate = (e) => {
    const startDate = moment(this.state.startDate);
    let endDate;
    if (e.target.nodeName === 'INPUT') {
      endDate = moment(e.target.value);
    }
    // calculate new time range with new end date
    const timeRange = this.getTimeRange(startDate, endDate);
    this.setState({ activeBtnLabel: ''});
    // invoke getData() with new time range to get new price data
    this.getData(timeRange);
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
      case 'day': {
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
    const timeRange = this.getTimeRange();
    // change currCrypto to the one user clicked on and reset active button in this.state
    // after setState has finished and these variables have been changed, invoke getData() to fetch new priceData from API
    this.setState(
      { currCrypto: { name, symbol }, activeBtnLabel: '1y' },
      () => this.getData(timeRange)
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
          invalidDateRange={this.state.invalidDateRange}
        />
      </div>
    );
  }
}

export default Container;
