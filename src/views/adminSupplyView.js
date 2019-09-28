import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import getSupply from '../selectors/supply';
import AdminSupplySingleView from './adminSupplySingleView';
import AdminSupplyMultiView from './adminSupplyMultiView';


var AdminSupplyView = React.createClass({
    render() {
        let playersupply = this.props.supply[this.props.player];
        if (playersupply.supply[0].icon) {
            return (<AdminSupplyMultiView />);
        }
        return (<AdminSupplySingleView />);
    }
});

const mapStateToProps = (state) => ({
    supply: getSupply(state),
    player: state.current.player
});

module.exports = connect(
  mapStateToProps
)(AdminSupplyView);