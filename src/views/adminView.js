import React from 'react';
import { View, ScrollView } from 'react-native';
import AdminWeatherView from './adminWeatherView';
import AdminInitiativeView from './adminInitiativeView';
import AdminSupplyView from './adminSupplyView';
import AdminReinforcementsView from './adminReinforcementsView';

var AdminView = React.createClass({
    render() {        
        return (
            <View style={{flex:1}}>       
                <View style={{flex:1}}>
                    <AdminWeatherView />   
                </View>
                <View style={{flex:1}}>
                    <AdminInitiativeView />
                </View>
                <View style={{flex:2}}>
                    <AdminSupplyView />
                </View>
                <View style={{flex:2}}>
                    <AdminReinforcementsView />
                </View>
            </View>
        );
    }
});

module.exports = AdminView;
