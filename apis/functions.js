const Promise = require('promise');
const fs = require('fs');
const { parse } = require('json2csv');

exports.jsonToCsv = (myData) => {
  const fields = ['start', 'end', 'open', 'close', 'high', 'low', 'volume'];
  const opts = { fields };
  try {
    return parse(myData, opts);
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.csvToFile = (data, fname) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./csv/${fname}.csv`, data, function (err) {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  })
};
