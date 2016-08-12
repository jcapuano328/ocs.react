'use strict'

var React = require('react');
import { View, Text, Image } from 'react-native';
var Icons = require('./res/icons');
var DiceRoll = require('./widgets/diceRoll');
var Player = require('./services/player');
var Supply = require('./services/supply');

var AdminSupplyView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'blackr'},
        {num: 1, low: 1, high: 6, color: 'blackw'}
    ],
    getInitialState() {
        let supply = Supply.current();
        return {
            supplyPlayer1: supply.player1,
            supplyPlayer2: supply.player2,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({supply: Supply.current()});
    },
    onDiceRoll(d) {
        this.resolve(d[0].value, d[1].value, d[2].value, d[3].value);
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve(this.state.die1, this.state.die2, this.state.die3, this.state.die4);
    },
    resolve(die1, die2, die3, die4) {
        Supply.find(die1, die2, die3, die4)
        .then((supply) => {
            console.log(supply);
            this.setState({die1: die1, die2: die2, die3: die3, die4: die4, supplyPlayer1: supply.player1, supplyPlayer2: supply.player2});
        })
        .catch((err) => {
            this.setState({die1: die1, die2: die2, die3: die3, die4: die4, supplyPlayer1: '', supplyPlayer2: ''});
            log.error(err);
        });
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Supply</Text>
                    <View style={{flex: 1, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                            style={{width: 52, height: 52, resizeMode: 'contain'}}
                            source={Icons[Player.player1().name.toLowerCase()]} />
                        <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 15, marginVertical: 10}}>{this.state.supplyPlayer1}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                            style={{width: 52, height: 52, resizeMode: 'contain'}}
                            source={Icons[Player.player2().name.toLowerCase()]} />
                        <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 15, marginVertical: 10}}>{this.state.supplyPlayer2}</Text>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = AdminSupplyView;
