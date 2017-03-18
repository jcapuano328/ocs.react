import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Supply from '../services/supply';
import getSupply from '../selectors/supply';
import {setSupply} from '../actions/current';

var AdminSupplyView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor: 'black'}
    ],
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
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
    onDiceRoll(d) {
        this.resolve(d[0].value, d[1].value);
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve(this.state.die1, this.state.die2);
    },
    resolve(die1, die2) {
        this.setState({die1: die1, die2: die2});        
        this.props.setSupply(this.props.player, Supply.find(this.props.turn, this.props.supply[this.props.player], die1, die2));
    },
    render() {
        let iconwidth = this.state.width;// || */Style.Scaling.scale(96);
        let iconheight = this.state.height;// || */Style.Scaling.scale(88);
        let player = this.props.supply[this.props.player];
        let playersupply = this.props[this.props.player];
        
        return (            
            <View style={{flex: 2, paddingTop: 4}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'left', paddingLeft:10}}>Supply</Text>                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 3, justifyContent:'flex-start', alignItems:'center'}} onLayout={this.onLayout}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 2, justifyContent:'center', alignItems:'center'}}>
                                <Image
                                    style={{width: iconwidth, height: iconheight, resizeMode: 'contain'}}
                                    source={Icons[player.icon.toLowerCase()]} />
                            </View>
                            <View style={{flex: 3, alignItems: 'center'}}>
                                <Text style={{marginLeft: 10, fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{playersupply}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        <View style={{flex:1}} />
                    </View>
                </View>                
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    supply: getSupply(state),
    turn: state.current.turn,
    player: state.current.player,
    player1: state.current.player1.supply,
    player2: state.current.player2.supply
});

const mapDispatchToProps = ({setSupply});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminSupplyView);