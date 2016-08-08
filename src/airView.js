'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');

var AirView = React.createClass({
  getInitialState() {
    return {
      battle: this.props.battle
    };
  },
  menuHandler() {
    this.props.onMenu && this.props.onMenu();
  },
  refreshHandler() {
    //console.log('Reset ' + this.props.battle.name);
    Current.reset(this.props.battle)
    .then((current) => {
        // update the views?
        this.eventEmitter.emit('reset');
    })
    .done();
  },
  onChangeTab({i, ref}) {
  },
  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}
          initialPage={0}
         >
         <Text tabLabel="Combat" events={this.props.events} />
         <Text tabLabel="Flak" events={this.props.events} />
         <Text tabLabel="Transport" events={this.props.events} />
         <Text tabLabel="Base Capture" events={this.props.events} />
        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = AirView;
