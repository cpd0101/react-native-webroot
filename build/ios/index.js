/**
 * @file index.js
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2015-11-28 09:11:54
 * @last-modified-by tanshaohui
 * @last-modified-time 2015-11-28 15:36:04
 */

'use strict';

var CommonData = require('common/data.js');
var CommonView = require('../common/view.js');
var Data = require('./data.js');
var React = require('react-native');
var Image = React.Image;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 50;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var IndexView = React.createClass({
  displayName: 'IndexView',

  getInitialState: function getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function rowHasChanged(row1, row2) {
          return row1 !== row2;
        }
      }),
      loaded: false
    };
  },

  componentDidMount: function componentDidMount() {
    this.fetchData();
  },

  fetchData: function fetchData() {
    var _this = this;

    fetch(REQUEST_URL).then(function (response) {
      return response.json();
    }).then(function (responseData) {
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true
      });
    }).done();
  },

  render: function render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return React.createElement(ListView, {
      dataSource: this.state.dataSource,
      renderRow: this.renderMovie,
      style: styles.listView
    });
  },

  renderLoadingView: function renderLoadingView() {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        Text,
        null,
        'Loading movies...'
      )
    );
  },

  renderMovie: function renderMovie(movie) {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(Image, {
        source: { uri: movie.posters.thumbnail },
        style: styles.thumbnail
      }),
      React.createElement(
        View,
        { style: styles.rightContainer },
        React.createElement(
          Text,
          { style: styles.title },
          movie.title
        ),
        React.createElement(
          Text,
          { style: styles.year },
          movie.year
        )
      )
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

module.exports = IndexView;