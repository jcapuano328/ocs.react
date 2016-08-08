'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var AdminWeatherView = require('./adminWeatherView');

var AdminView = React.createClass({
    getInitialState() {
        return {
        };
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <AdminWeatherView events={this.props.events} />
            </View>
        );
    }
});

module.exports = AdminView;
