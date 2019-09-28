import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import AdminView from './adminView';
import GroundView from './groundView';
import BarrageView from './barrageView';
import AirView from './airView';
import SeaView from './seaView';
import SupplyView from './supplyView';
import GeneralView from './generalView';
import Icons from '../res';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>            
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    initialPage={this.state.initialPage}
                >
                    <AdminView tabLabel="Admin" />
                    <GroundView tabLabel="Ground" />
                    <BarrageView tabLabel="Barrage" />
                    <AirView tabLabel="Air" />
                    <SeaView tabLabel="Sea" />
                    <SupplyView tabLabel="Supply" />
                    <GeneralView tabLabel="General" />
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
