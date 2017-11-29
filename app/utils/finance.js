exports.getStock = function getStock(opts, type) {
  const defs = {
    baseURL: 'https://query.yahooapis.com/v1/public/yql?q=',
    query: {
      quotes: 'select * from yahoo.finance.quotes where symbol in ("{stock}")',
      historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"',
    },
    suffixURL: {
      quotes: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
      historicaldata: '&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys',
    },
  };

  opts = opts || {};

  if (!opts.stock) {
    console.log('No stock defined');
    return;
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '");
  }

  console.log(opts.stock);

  const query = defs.query[type]
    .replace('{stock}', opts.stock)
    .replace('{startDate}', opts.startDate)
    .replace('{endDate}', opts.endDate);

  const url = 'http://localhost:3000/ticker/';
  console.log('url', url);
  return fetch(url);  // eslint-disable-line no-undef
};

exports.properties = [
  'id',
  'name',
  'symbol',
  'rank',
  'price_usd',
  'price_btc',
  '24h_volume_usd',
  'market_cap_usd',
  'available_supply',
  'total_supply',
  'max_supply',
  'percent_change_1h',
  'percent_change_24h',
  'percent_change_7d',
  'last_updated'
];

exports.getNews = function getNews(symbol) {
  // const url = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${symbol}&region=US&lang=en-US`;
  const url = `http://localhost:3000/ticker/`;
  console.log(url);
  return fetch(url)  // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err));
};

exports.symbolSuggest = function symbolSuggest(query) {
  const url = `http://localhost:3000/ticker/`;
  console.log(url);
  return fetch(url).catch(err => console.error(err));  // eslint-disable-line no-undef
};
