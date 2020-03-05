const axios = require('axios');
const helper = require('./functions');

const getCryptoCompareApi = async () => {
  await axios
    .get(
      `https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=720&api_key=c7a8494c7c1bc4bc54ba113c13bfa8bbb67261bd9bd4a9b86641dc1ef4952923`,
    )
    .then((res) => {
      return res.data.Data.map(item => {
        const time = (new Date(item.time * 1000)).toISOString();
        return {
          start: time,
          end: time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volumefrom,
        };
      })
    })
    .then((res) => {
      return helper.jsonToCsv(res);
    })
    .then((res) => {
      return helper.csvToFile(res, 'min-api.cryptocompare.com');
    })
    .catch((err) => {
      console.log(err);
    });
};

getCryptoCompareApi()
  .then(() => {
    console.log('========== https://min-api.cryptocompare.com ==========');
    console.log('success');
  });
