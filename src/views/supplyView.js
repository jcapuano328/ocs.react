import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import SupplyAttritionView from './supplyAttritionView';
import SupplyCaptureView from './supplyCaptureView';
import SupplyDestructionView from './supplyDestructionView';

var SupplyView = React.createClass({
    getInitialState() {
        return {
            page: 0
        };
    },
    componentDidMount() {
        // hack to get the page to display (in a nested view)
        this.refs.tab.goToPage(-1);
        setTimeout(() => this.refs.tab.goToPage(this.state.page), 0);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    ref="tab"
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    initialPage={this.state.page}>
                    <SupplyAttritionView tabLabel="Attrition" />
                    <SupplyCaptureView tabLabel="Capture" />
                    <SupplyDestructionView tabLabel="Destruction" />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = SupplyView;