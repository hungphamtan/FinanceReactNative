import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

// Elements
import NewsCell from './news-cell';

import rss from '../../../utils/rss';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      key: Math.random(),
    };
  }

  componentDidMount() {
    const that = this;
    rss(`http://localhost:3000/ticker/`).then((json) => {
      console.log(json);
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(json),
        key: Math.random(),
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          key={this.state.key}
          dataSource={this.state.dataSource}
          renderRow={news => <NewsCell news={news} />}
        />
      </View>
    );
  }
}

NewsPage.propTypes = {
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
};

NewsPage.defaultProps = {
  stock: {},
};
