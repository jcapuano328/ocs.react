'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var icons = require('./res/icons');

var TurnView = require('./turnView');
var AdminView = require('./adminView');
var GroundView = require('./groundView');
var BarrageView = require('./barrageView');
var AirView = require('./airView');
var SeaView = require('./seaView');
var SupplyView = require('./supplyView');
var GeneralView = require('./generalView');
var Current = require('./services/current');

var BattleView = React.createClass({
  getInitialState() {
    return {
      battle: this.props.battle,
      initialPage: 0
    };
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
        <TurnView logo={icons[battle.image]} events={this.props.events} />
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}
          initialPage={this.state.initialPage}
         >
         <AdminView tabLabel="Admin" events={this.props.events} />
         <GroundView tabLabel="Ground" events={this.props.events} />
         <BarrageView tabLabel="Barrage" events={this.props.events} />
         <AirView tabLabel="Air" events={this.props.events} />
         <SeaView tabLabel="Sea" events={this.props.events} />
         <SupplyView tabLabel="Supply" events={this.props.events} />
         <GeneralView tabLabel="General" events={this.props.events} />

        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = BattleView;
