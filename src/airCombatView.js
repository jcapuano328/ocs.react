'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var DiceRoll = require('./widgets/diceRoll');
var Air = require('./services/air');

let AirCombatView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'yellow'}
    ],
    getInitialState() {
        return {
            attack: '1',
            defend: '1',
            results: '',
            die1: 1,
            die2: 1,
            die3: 1
        };
    },
    onChangeAttack(v) {
        //this.setState({attack: v});
        this.state.attack = v;
        this.resolve();
    },
    onChangeDefend(v) {
        //this.setState({defend: v});
        this.state.defend = v;
        this.resolve();
    },
    onDiceRoll(d) {
        //this.setState({die1: d[0].value,die2: d[1].value, die3: d[2].value});
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        console.log(d + '/' + v);
        //let state = {};
        //state['die'+d] = v;
        //this.setState(state);
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        var results = Air.combat(+this.state.attack,+this.state.defend,this.state.die1,this.state.die2,this.state.die3);
        this.state.results = results;
        this.setState(this.state);
        //this.setState({results: results});
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{marginLeft: 10}}>Attacker</Text>
                        </View>
                        <View style={{flex:2}}>
                            <SpinNumeric value={this.state.attack} min={0} max={10} onChanged={this.onChangeAttack} />
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Defender</Text>
                        </View>
                        <View style={{flex:2, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.defend} min={0} max={10} onChanged={this.onChangeDefend} />
                        </View>
                    </View>
                </View>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 15}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = AirCombatView;
