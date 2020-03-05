const axios = require('axios');
const helper = require('./functions');

const getCryptoWatch = async () => {
  await axios
    .get(
      `https://api.cryptowat.ch/markets/coinbase-pro/btcusd/ohlc`,
    )
    .then((res) => {
      return res.data.result['3600'].map(item => {
        const time = (new Date(item[0] * 1000)).toISOString();
        return {
          start: time,
          end: time,
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
          volume: item[5],
        };
      })
    })
    .then((res) => {
      return helper.jsonToCsv(res);
    })
    .then((res) => {
      return helper.csvToFile(res, 'api.cryptowat.ch');
    })
    .catch((err) => {
      console.log(err);
    });
};

getCryptoWatch()
  .then(() => {
    console.log('========== https://api.cryptowat.ch ==========');
    console.log('success');
  });
