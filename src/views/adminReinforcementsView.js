import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Reinforcements from '../services/reinforcements';
import getReinforcements from '../selectors/reinforcements';
import {setReinforcements,save} from '../actions/current';

var AdminReinforcementsView = React.createClass({
    player1dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor: 'black'}
    ],
    player2dice: [
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'red'},
        {num: 1, low: 1, high: 6, color: 'black', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
    },
    onDiceRollPlayer1(d) {
        this.resolvePlayer1(d[0].value, d[1].value);
    },
    onDieChangedPlayer1(d,v) {
        this.state['die'+d] = v;
        this.resolvePlayer1(this.state.die1, this.state.die2);
    },
    resolvePlayer1(die1, die2) {        
        this.setState({die1: die1, die2: die2});
        this.props.setReinforcements('player1', Reinforcements.find(this.props.turn, this.props.reinforcements.player1, die1, die2));
        this.props.save().done();
    },

    onDiceRollPlayer2(d) {
        this.resolvePlayer2(d[0].value, d[1].value);
    },
    onDieChangedPlayer2(d,v) {
        this.state['die'+(d+2)] = v;
        this.resolvePlayer2(this.state.die3, this.state.die4);
    },
    resolvePlayer2(die1, die2) {
        this.setState({die3: die1, die4: die2});
        this.props.setReinforcements('player2', Reinforcements.find(this.props.turn, this.props.reinforcements.player2, die1, die2));
        this.props.save().done();
    },

    render() {
        return (
            <View style={{flex: 1,justifyContent: 'flex-start'}}>
                <Text style={{flex: 0.65, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Reinforcements</Text>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{flex: .5, width: 52, height: 52, resizeMode: 'stretch'}}
                        source={Icons[this.props.reinforcements.player1.icon.toLowerCase()]} />
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <Text style={{marginLeft: 10, fontSize: 28, fontWeight: 'bold'}}>{this.props.player1}</Text>
                    </View>
                    <View style={{flex: 3, marginRight: 5}}>
                        <DiceRoll dice={this.player1dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRollPlayer1} onDie={this.onDieChangedPlayer1}/>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center',marginTop:10}}>
                    <Image
                        style={{flex: .5, width: 52, height: 52, resizeMode: 'stretch'}}
                        source={Icons[this.props.reinforcements.player2.icon.toLowerCase()]} />
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <Text style={{marginLeft: 10, fontSize: 28, fontWeight: 'bold'}}>{this.props.player2}</Text>
                    </View>
                    <View style={{flex: 3, marginRight: 5}}>
                        <DiceRoll dice={this.player2dice} values={[this.state.die3,this.state.die4]}
                            onRoll={this.onDiceRollPlayer2} onDie={this.onDieChangedPlayer2}/>
                    </View>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    reinforcements: getReinforcements(state),
    turn: state.current.turn,
    player1: state.current.player1.reinforcements,
    player2: state.current.player2.reinforcements
});

const mapDispatchToProps = ({setReinforcements,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminReinforcementsView);