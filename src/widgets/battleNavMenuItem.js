'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var icons = require('../res/icons');

var BattleNavMenuItem = React.createClass({
    onPress() {
        this.props.onPress && this.props.onPress('battle', this.props.id);
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1,backgroundColor: '#fff'}}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                        backgroundColor: '#eaeaea',
                        borderRadius: 3
                    }}>
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: 64,
                            height: 96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={icons[this.props.image]} />
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.name}</Text>
                            <Text style={{fontSize: 15,textAlign: 'center',margin: 10,color: 'blue'}}>{this.props.desc}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = BattleNavMenuItem;
