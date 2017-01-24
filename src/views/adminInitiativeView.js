import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {IconButton} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Initiative from '../services/initiative';
import getInitiativePlayer from '../selectors/initiativePlayer';
import {setInitiative,nextInitiative,save} from '../actions/current';


var AdminInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor: 'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor: 'black'}
    ],
    getInitialState() {
        return {            
            die1: 1,
            die2: 1
        };
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
        this.props.save().done();
    },
    resolve(die1, die2) {
        this.setState({die1:die1,die2:die2});
        this.props.setInitiative(Initiative.find(die1, die2));
        this.props.save().done();
    },
    render() {
        let player = this.props.player ? this.props.player : {icon: 'tie'};
        return (
            <View style={{flex: 1,flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Initiative</Text>
                <View style={{flex: 2, marginRight: 5}}>
                <IconButton image={Icons[player.icon.toLowerCase()]} width={80} height={80} resizeMode={'contain'} onPress={this.onNextPlayer}/>
                </View>
                <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
            </View>
        );        
    }
});

const mapStateToProps = (state) => ({
    player: getInitiativePlayer(state)
});

const mapDispatchToProps = ({setInitiative,nextInitiative,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminInitiativeView);
