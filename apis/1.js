const Promise = require('promise');
const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');

const jsonToCsv = (myData) => {
  const fields = ['start', 'end', 'open', 'close', 'high', 'low', 'volume'];
  const opts = { fields };
  try {
    return parse(myData, opts);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const csvToFile = (data, fname) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./csv/${fname}.csv`, data, function (err) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  })
};

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
          close: item.close,
          high: item.high,
          low: item.low,
          volume: item.volumefrom,
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'min-api.cryptocompare.com');
    })
    .catch((err) => {
      console.log(err);
    });
};

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
          close: item.price_close,
          high: item.price_high,
          low: item.price_low,
          volume: item.volume_traded,
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'rest.coinapi.io');
    })
    .catch((err) => {
      console.log(err);
    });
};

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
          close: item.close,
          high: item.high,
          low: item.low,
          volume: item.volume,
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'dev-api.shrimpy.io');
    })
    .catch((err) => {
      console.log(err);
    });
};

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
          close: item[4],
          high: item[2],
          low: item[3],
          volume: item[5],
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'api.cryptowat.ch');
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCryptoApis = async () => {
  await axios
    .get(
      `https://api.cryptoapis.io/v1/ohlcv/periods`,
      {
        headers: {
          'X-API-Key': '31247c4bda4b31d7b21d8cd47e887af37dac5f3a'
        }
      }
    )
    .then((res) => {
      return res.data.payload.map(item => {
        const time = (new Date(item[0] * 1000)).toISOString();
        return {
          start: time,
          end: time,
          open: item[1],
          close: item[4],
          high: item[2],
          low: item[3],
          volume: item[5],
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'api.cryptoapis.io');
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBlocCc = async () => {
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
          close: item[2],
          high: item[4],
          low: item[3],
          volume: item[5],
        };
      })
    })
    .then((res) => {
      return jsonToCsv(res);
    })
    .then((res) => {
      return csvToFile(res, 'data.block.cc');
    })
    .catch((err) => {
      console.log(err);
    });
};

// getCryptoCompareApi()
//   .then(() => {
//     console.log('========== https://min-api.cryptocompare.com ==========');
//     console.log('success');
//   });

// getCoinApi()
//   .then(() => {
//     console.log('========== https://rest.coinapi.io ==========');
//     console.log('success');
//   });

// getShrimpy()
//   .then(() => {
//     console.log('========== https://dev-api.shrimpy.io ==========');
//     console.log('success');
//   });

// getCryptoWatch()
//   .then(() => {
//     console.log('========== https://api.cryptowat.ch ==========');
//     console.log('success');
//   });

getBlocCc()
  .then(() => {
    console.log('========== https://data.block.cc ==========');
    console.log('success');
  });

// complicated
// getCryptoApis()
//   .then(() => {
//     console.log('========== https://api.cryptoapis.io ==========');
//     console.log('success');
//   });