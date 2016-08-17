'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var AirCombatView = require('./airCombatView');
var AirFlakView = require('./airFlakView');
var AirTransportView = require('./airTransportView');

var AirView = React.createClass({
    getInitialState() {
        return {
            page: 2
        };
    },
    componentDidMount() {
        // hack to get the page to display (in a nested view)
        this.refs.tab.goToPage(-1);
        setTimeout(() => this.refs.tab.goToPage(this.state.page), 0);
    },
    onChangeTab({i, ref}) {
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    ref="tab"
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.page}>
                    <AirCombatView tabLabel="Combat" events={this.props.events} />
                    <AirFlakView tabLabel="Flak" events={this.props.events} />
                    <AirTransportView tabLabel="Transport" events={this.props.events} />
                    <Text tabLabel="Base Capture" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = AirView;
