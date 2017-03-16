import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Initiative from '../services/initiative';
import getInitiativePlayer from '../selectors/initiativePlayer';
import {setInitiative,nextInitiative} from '../actions/current';


var AdminInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}
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
        if (this.state.width != e.nativeEvent.layout.width ||
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
    onNextPlayer() {
        this.props.nextInitiative();        
    },
    resolve(die1, die2) {
        this.setState({die1:die1,die2:die2});
        this.props.setInitiative(Initiative.find(die1, die2));    
    },
    render() {
        let player = this.props.player ? this.props.player : {icon: 'tie'};
        let iconwidth = /*this.state.width || */88;
        let iconheight = /*this.state.height || */82;        
        return (
            <View style={{flex: 1, paddingTop: 4}}>
                <View style={{flex: 1,flexDirection: 'row'}}>
                    <View style={{flex: 3, justifyContent:'center', alignItems:'center'}}>
                        <IconButton image={Icons[player.icon.toLowerCase()]} width={iconwidth} height={iconheight} resizeMode={'contain'} onPress={this.onNextPlayer}/>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 7}}/>
            </View>
        );        
    }
});

const mapStateToProps = (state) => ({
    player: getInitiativePlayer(state)
});

const mapDispatchToProps = ({setInitiative,nextInitiative});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminInitiativeView);
