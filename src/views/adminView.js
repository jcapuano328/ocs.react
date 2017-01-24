import React from 'react';
import { View, ScrollView } from 'react-native';
import AdminWeatherView from './adminWeatherView';
import AdminInitiativeView from './adminInitiativeView';
import AdminSupplyView from './adminSupplyView';
import AdminReinforcementsView from './adminReinforcementsView';

var AdminView = React.createClass({
    render() {
        return (
            <ScrollView style={{flex:1}}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}>            
                <AdminWeatherView />
                <AdminInitiativeView />
                <AdminSupplyView />
                <AdminReinforcementsView />                
            </ScrollView>
            /*
            <ScrollView                
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}>
            </ScrollView>
            */
        );
    }
});

module.exports = AdminView;
