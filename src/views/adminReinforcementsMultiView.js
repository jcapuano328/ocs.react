import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import AdminReinforcementsMultiPlayerView from './adminReinforcementsMultiPlayerView';
import getReinforcements from '../selectors/reinforcements';

var AdminReinforcementsMultiView = React.createClass({
    render() {
        let playerreinforcements = this.props.reinforcements[this.props.player];        
        return (
            <View style={{flex: 2, paddingTop: 4}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'left', paddingLeft:10}}>Variable Reinforcements</Text>                
                <View style={{flex: 1}}>
                    {playerreinforcements.reinforcements.map((p,i) => {
                        return (
                            <AdminReinforcementsMultiPlayerView key={i} playerreinforcements={p} />
                        );
                    })}
                </View>
            </View>
        );     
    }
});

const mapStateToProps = (state) => ({
    reinforcements: getReinforcements(state),    
    player: state.current.player
});

module.exports = connect(
  mapStateToProps
)(AdminReinforcementsMultiView);