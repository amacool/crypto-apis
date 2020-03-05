const axios = require('axios');
const helper = require('./functions');

const getBlockCc = async () => {
  await axios
    .get(
      `https://data.block.cc/api/v1/kline?market=bitfinex&symbol_pair=BTC_USD&type=1h`
    )
    .then((res) => {
      return res.data.data.map(item => {
        const time = (new Date(item[0])).toISOString();
        return {
          start: time,
          end: time,
          open: item[1],
          high: item[4],
          low: item[3],
          close: item[2],
          volume: item[5],
        };
      })
    })
    .then((res) => {
      return helper.jsonToCsv(res);
    })
    .then((res) => {
      return helper.csvToFile(res, 'data.block.cc');
    })
    .catch((err) => {
      console.log(err);
    });
};

getBlockCc()
  .then(() => {
    console.log('========== https://data.block.cc ==========');
    console.log('success');
  });
