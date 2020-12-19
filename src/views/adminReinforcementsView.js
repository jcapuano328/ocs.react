import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import getReinforcements from '../selectors/reinforcements';
import AdminReinforcementsNoneView from './adminReinforcementsNoneView';
import AdminReinforcementsSingleView from './adminReinforcementsSingleView';
import AdminReinforcementsMultiView from './adminReinforcementsMultiView';


var AdminReinforcementsView = React.createClass({
    render() {
        let playerreinforcements = this.props.reinforcements[this.props.player];        
        if (playerreinforcements && playerreinforcements.reinforcements && playerreinforcements.reinforcements.length > 0 ) {
            if (playerreinforcements.reinforcements[0].icon) {
                return (<AdminReinforcementsMultiView />);
            }
            return (<AdminReinforcementsSingleView />);
        }
        return (<AdminReinforcementsNoneView />);
    }
});

const mapStateToProps = (state) => ({
    reinforcements: getReinforcements(state),
    player: state.current.player
});

module.exports = connect(
  mapStateToProps
)(AdminReinforcementsView);