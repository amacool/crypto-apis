const axios = require('axios');
const helper = require('./functions');

const getShrimpy = async () => {
  await axios
    .get(
      `https://dev-api.shrimpy.io/v1/exchanges/coinbasepro/candles?quoteTradingSymbol=USD&baseTradingSymbol=BTC&interval=1H`,
    )
    .then((res) => {
      return res.data.map(item => {
        return {
          start: item.time,
          end: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        };
      })
    })
    .then((res) => {
      return helper.jsonToCsv(res);
    })
    .then((res) => {
      return helper.csvToFile(res, 'dev-api.shrimpy.io');
    })
    .catch((err) => {
      console.log(err);
    });
};

getShrimpy()
  .then(() => {
    console.log('========== https://dev-api.shrimpy.io ==========');
    console.log('success');
  });
