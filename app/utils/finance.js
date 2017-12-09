import Configs from '../../config';
console.log('config');
console.log(Configs);




const URL = "https://api-public.sandbox.gdax.com/",
  SOCKET_URL = "wss://ws-feed.gdax.com"


const initData = () => {
  console.log('initData');
  fetch(`${URL}products`)
    .then(res => res.json())
    .then(json => {
      console.log('gdax data');
      console.log(json);
      connectSocket();
      return json;
    })
    .catch(e => console.error(e.message));
}

const connectSocket = () => {
  const ws = new WebSocket(SOCKET_URL);

  ws.onopen = () => {
    console.log('WebSocket: onopen');
    // const state = getState(),
    //   product_ids = Object.keys(state.prices)
    //     .map(k => state.prices[k].id);
    const product_ids = ['BTC-USD', 'ETH-EUR'];

    ws.send(JSON.stringify({
      type: 'subscribe',
      product_ids
    }));
  }

  ws.onmessage = (msg) => {
    console.log('WebSocket: onmessage');
    
    const { type, price, product_id, reason, size } = JSON.parse(msg.data);
    const value = {
      time: new Date(),
      price: Number(price)
    }
    console.log(`${product_id}: ${price}: ${size} : ${type}`);
    if (type === 'match' && price) {
      // add value
      console.log('product_id: ', product_id);
      console.log('value: ', value);
    }
  }

  ws.onerror = (e) => {
    console.log(e.message);
  }

  ws.onclose = (e) => {
    console.log(e.code, e.reason);
  }
}

exports.getStock = function getStock(opts, type) {
  initData();
  opts = opts || {};

  if (!opts.stock) {
    console.log('No stock defined');
    return;
  }

  if (opts.stock instanceof Array) {
    opts.stock = opts.stock.join("', '");
  }

  console.log(opts.stock);

  const url = `${Configs.api.rootPath}ticker/`;
  console.log('url: ', url);
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
  const url = `${Configs.api.rootPath}ticker/`;
  console.log(url);
  return fetch(url)  // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err));
};

exports.symbolSuggest = function symbolSuggest(query) {
  const url = `${Configs.api.rootPath}ticker/`;
  console.log(url);
  return fetch(url).catch(err => console.error(err));  // eslint-disable-line no-undef
};
