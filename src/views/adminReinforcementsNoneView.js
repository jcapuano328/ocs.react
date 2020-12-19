import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import Icons from '../res';
import getPlayer from '../selectors/currentPlayer';

var AdminReinforcementsNoneView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (/*this.state.width != e.nativeEvent.layout.width ||*/
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },            
    render() {
        let iconwidth = this.state.width;// || */96;
        let iconheight = this.state.height;// || */88;    

        console.log('Admin Reinforcements None', this.props);
        let player = this.props.player;//this.props.reinforcements[this.props.player];        

        return (            
            <View style={{flex: 2, paddingTop: 4}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'left', paddingLeft:10}}>Variable Reinforcements</Text>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 3, justifyContent:'flex-start', alignItems:'center'}} onLayout={this.onLayout}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 2, justifyContent:'center', alignItems:'center'}}>
                                <Image
                                    style={{width: iconwidth, height: iconheight, resizeMode: 'contain'}}
                                    source={Icons[(player||{icon:''}).icon.toLowerCase()]} />
                            </View>
                            <View style={{flex: 3, alignItems: 'center'}}>
                                <Text style={{marginLeft: 10, fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{'Other'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                    </View>
                </View>                
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    player: getPlayer(state)
});

module.exports = connect(
  mapStateToProps,
)(AdminReinforcementsNoneView);