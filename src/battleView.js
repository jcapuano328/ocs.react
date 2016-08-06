'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var EventEmitter = require('EventEmitter');
var icons = require('./res/icons');

var TurnView = require('./widgets/turnView');
//var FireView = require('./battle/fireView');
//var MeleeView = require('./battle/meleeView');
//var MoraleView = require('./battle/moraleView');
//var GeneralView = require('./battle/generalView');
var Current = require('./services/current');

var BattleView = React.createClass({
  getInitialState() {
    return {
      battle: this.props.battle
    };
  },
  componentWillMount() {
      this.eventEmitter = new EventEmitter();
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
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
    let battle = this.state.battle || {};
    return (
      <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
        <TurnView logo={icons[battle.image]} events={this.eventEmitter} />
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}
          initialPage={0}
         >
         <Text tabLabel="Admin" events={this.eventEmitter} />
         <Text tabLabel="Ground" events={this.eventEmitter} />
         <Text tabLabel="Barrage" events={this.eventEmitter} />
         <Text tabLabel="Air" events={this.eventEmitter} />
         <Text tabLabel="Sea" events={this.eventEmitter} />
         <Text tabLabel="Supply" events={this.eventEmitter} />
         <Text tabLabel="General" events={this.eventEmitter} />

        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = BattleView;
