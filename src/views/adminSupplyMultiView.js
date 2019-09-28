import React from 'react';
import { View, Text, Image } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import AdminSupplyMultiPlayerView from './adminSupplyMultiPlayerView';
import getSupply from '../selectors/supply';

var AdminSupplyMultiView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {
        let playersupply = this.props.supply[this.props.player];        
        return (
            <View style={{flex: 2, paddingTop: 4}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'left', paddingLeft:10}}>Supply</Text>                
                <View style={{flex: 1}}>
                    {playersupply.supply.map((p,i) => {
                        return (
                            <AdminSupplyMultiPlayerView key={i} tabLabel={p.icon.toUpperCase()} playersupply={p} />
                        );
                    })}
                </View>
                {/*
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    initialPage={this.state.initialPage}
                >
                </ScrollableTabView>
                */}
            </View>
        );     
    }
});

const mapStateToProps = (state) => ({
    supply: getSupply(state),    
    player: state.current.player
});

module.exports = connect(
  mapStateToProps
)(AdminSupplyMultiView);