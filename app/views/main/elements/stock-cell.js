import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';

// Flux
import StockActions from '../../../actions/stock-action';
import StockStore from '../../../stores/stock-store';

const ROTATE_PROPERTIES = {
  percent_change_1h: 'percent_change_1h',
  percent_change_24h: 'percent_change_24h',
  percent_change_7d: 'percent_change_7d',
  MarketCapitalization: 'market_cap_usd',
};

const RED_COLOR = '#FC3D39';
const GREEN_COLOR = '#53D769';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: RED_COLOR,
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: GREEN_COLOR,
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default class StockCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = StockStore.getState();
    this.onStockStoreChange = this.onStockStoreChange.bind(this);
  }

  componentDidMount() {
    StockStore.listen(this.onStockStoreChange);
  }

  componentWillUnmount() {
    StockStore.unlisten(this.onStockStoreChange);
  }

  onStockStoreChange(state) {
    this.setState({
      selectedProperty: state.selectedProperty,
      selectedStock: state.selectedStock,
    });
  }

  changeSelectedStock(stock) {
    StockActions.selectStock(stock);
  }

  render() {
    const {
      watchlistResult,
      stock: {
        symbol
      }
     } = this.props;

    const {
      selectedStock
    } = this.state;
    const stockCell = watchlistResult[symbol];
    return (
      <TouchableHighlight
        style={[selectedStock.symbol === symbol ? styles.selected : null]}
        onPress={() => this.changeSelectedStock(this.props.stock)} underlayColor="#202020"
      >
        <View style={[styles.container, selectedStock.symbol === symbol ? styles.selected : null]}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              {symbol}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {watchlistResult && stockCell && stockCell.price_usd}
            </Text>
          </View>
          <TouchableHighlight
            style={(() => {
              switch (watchlistResult
              && stockCell
              && stockCell.percent_change_1h
              && stockCell.percent_change_1h.startsWith('-')) {
                case true: return styles.changeRed;
                case false: return styles.changeGreen;
                default: return styles.changeGreen;
              }
            })()}
            underlayColor={(() => {
              switch (watchlistResult
              && stockCell
              && stockCell.percent_change_1h
              && stockCell.percent_change_1h.startsWith('-')) {
                case true: return RED_COLOR;
                case false: return GREEN_COLOR;
                default: return GREEN_COLOR;
              }
            })()}
            onPress={() => StockActions.selectProperty(ROTATE_PROPERTIES[this.state.selectedProperty])}
          >
            <View>
              <Text style={styles.changeText}>
                {(() => {
                  switch (this.state.selectedProperty) {
                    case 'Change': return (
                      watchlistResult
                      && stockCell
                      && stockCell.percent_change_1h) || '--';
                    case 'percent_change_24h': return (
                      watchlistResult
                      && stockCell
                      && stockCell.percent_change_24h) || '--';
                    case 'percent_change_7d': return (
                      watchlistResult
                      && stockCell
                      && stockCell.percent_change_7d) || '--';
                    case 'market_cap_usd': return (
                      watchlistResult
                      && stockCell
                      && stockCell.market_cap_usd) || '--';
                    default: return (
                      watchlistResult
                      && stockCell
                      && stockCell.percent_change_1h) || '--';
                  }
                })()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  watchlistResult: React.PropTypes.shape({}),
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
};

StockCell.defaultProps = {
  watchlistResult: [],
  stock: {},
};
