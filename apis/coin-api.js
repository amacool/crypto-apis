const axios = require('axios');
const helper = require('./functions');

const getCoinApi = async () => {
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - 30);
  await axios
    .get(
      `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=1HRS&time_start=${startTime.toISOString()}&limit=720&apikey=F2F34C02-3125-42BD-A219-1B844CBD8000`,
    )
    .then((res) => {
      return res.data.map(item => {
        return {
          start: item.time_period_start,
          end: item.time_period_end,
          open: item.price_open,
          high: item.price_high,
          low: item.price_low,
          close: item.price_close,
          volume: item.volume_traded,
        };
      })
    })
    .then((res) => {
      return helper.jsonToCsv(res);
    })
    .then((res) => {
      return helper.csvToFile(res, 'rest.coinapi.io');
    })
    .catch((err) => {
      console.log(err);
    });
};

getCoinApi()
  .then(() => {
    console.log('========== https://rest.coinapi.io ==========');
    console.log('success');
  });