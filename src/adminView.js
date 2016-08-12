'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var AdminWeatherView = require('./adminWeatherView');
var AdminInitiativeView = require('./adminInitiativeView');
var AdminSupplyView = require('./adminSupplyView');

var AdminView = React.createClass({
    getInitialState() {
        return {
        };
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <AdminWeatherView events={this.props.events} />
                <AdminInitiativeView events={this.props.events} />
                <AdminSupplyView events={this.props.events} />
            </View>
        );
    }
});

module.exports = AdminView;
