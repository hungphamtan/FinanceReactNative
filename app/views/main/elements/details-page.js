import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { formatCurrency, formatPercent, formatDate } from '../../../utils/functions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6',
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
  },
});

export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1D',
    };
  }

  render() {
    const {
      watchlistResult,
      stock: {
        symbol
      }
     } = this.props;
    const stockSelected = watchlistResult[symbol];
    if (!watchlistResult || !stockSelected) {
      return (
        <View style={styles.container}>
          <Text style={styles.nameText}>'--'</Text>
        </View>  
      )
    } else 
    return (
      <View style={styles.container}>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {`#${stockSelected.rank} :`} {stockSelected.name} {' - '}
            {stockSelected.symbol}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                24H VOLUME USD
              </Text>
              <Text style={styles.valueText}>
                {formatCurrency(stockSelected['24h_volume_usd'])}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                MARKET CAP USD
              </Text>
              <Text style={styles.valueText}>
                {formatCurrency(stockSelected.market_cap_usd)}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                TOTAL SUPPLY
              </Text>
              <Text style={styles.valueText}>
                {formatCurrency(stockSelected.total_supply)}
              </Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                AVAILABLE SUPPLY
              </Text>
              <Text style={styles.valueText}>
                {formatCurrency(stockSelected.available_supply)}
              </Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                MAX SUPPLY
              </Text>
              <Text style={styles.valueText}>
                {formatCurrency(stockSelected.max_supply)}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                Percent Change 1h
              </Text>
              <Text style={styles.valueText}>
                {formatPercent(stockSelected.percent_change_1h)}
              </Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                Change 24h
              </Text>
              <Text style={styles.valueText}>
                {formatPercent(stockSelected.percent_change_24h)}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                Change 7d
              </Text>
              <Text style={styles.valueText}>
                {formatPercent(stockSelected.percent_change_7d)}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                LAST UPDATED
              </Text>
              <Text style={styles.valueText}>
                {formatDate(stockSelected.last_updated)}
              </Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
                
              </Text>
              <Text style={styles.valueText}>
                {'--'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

DetailsPage.propTypes = {
  watchlistResult: React.PropTypes.shape({}),
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
};

DetailsPage.defaultProps = {
  watchlistResult: [],
  stock: {},
};
