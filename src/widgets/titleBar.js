'use strict';

var React = require('react');
import { View, Text } from 'react-native';
var IconButton = require('./iconButton');
let iconWidth = 32, iconHeight = 32;

var renderTitle = (props) => {
    if (typeof props.title == 'function') {
        return props.title();
    }
    return props.title || '';
}

var TitleBar = (props) => {
    props = props || {};
    return {
        LeftButton(route, navigator, index, navState) {
            route = route || {};
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <IconButton image={props.logo || 'menu'} height={iconHeight} width={iconWidth} resizeMode='stretch' onPress={route.onMenu} />
                    {index > 0 ? <IconButton image={'back'} height={iconHeight} width={iconWidth} resizeMode='stretch' onPress={() => navigator.pop()} /> : null}
                </View>
            );
        },
        Title(route, navigator, index, navState) {
            route = route || {};
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                          color: 'white',
                          fontSize: 28,
                          fontWeight: 'bold',
                          marginLeft: 10,
                          marginVertical: 10,
                          //color: 'blue'
                        }}>
                      {renderTitle(route)}
                    </Text>
                </View>
            );
        },
        RightButton(route, navigator, index, navState) {
            route = route || {};
            if (!route.onRefresh) {
              return null;
            }
            return (
                <View style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
                    <IconButton border={true} image={'refresh'} height={iconHeight} width={iconWidth} onPress={route.onRefresh} />
                </View>
            );
        }
    };
}

module.exports = TitleBar;
