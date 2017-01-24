import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TurnView from './turnView';
import AdminView from './adminView';
/*
var GroundView = require('./groundView');
var BarrageView = require('./barrageView');
var AirView = require('./airView');
var SeaView = require('./seaView');
var SupplyView = require('./supplyView');
var GeneralView = require('./generalView');
*/
import Icons from '../res';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    onChangeTab() {
    },
    render() {        
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}                    
                >
                    <AdminView tabLabel="Admin" />
                    <View tabLabel="Ground" />
                    <View tabLabel="Barrage" />
                    <View tabLabel="Air" />
                    <View tabLabel="Sea" />
                    <View tabLabel="Supply" />
                    <View tabLabel="General" />
                </ScrollableTabView>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
