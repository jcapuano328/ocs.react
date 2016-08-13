'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var AdminWeatherView = require('./adminWeatherView');
var AdminInitiativeView = require('./adminInitiativeView');
var AdminSupplyView = require('./adminSupplyView');
var AdminReinforcementsView = require('./adminReinforcementsView');

var AdminView = React.createClass({
    render() {
        return (
            <View>
                <AdminWeatherView events={this.props.events} />
                <AdminInitiativeView events={this.props.events} />
                <AdminSupplyView events={this.props.events} />
                <AdminReinforcementsView events={this.props.events} />
            </View>
        );
    }
});

module.exports = AdminView;
