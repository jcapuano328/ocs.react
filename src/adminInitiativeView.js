'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var IconButton = require('./widgets/iconButton');
var DiceRoll = require('./widgets/diceRoll');
var Initiative = require('./services/initiative');

var AdminInitiativeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            initiative: Initiative.current(),
            die1: 1,
            die2: 1
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({initiative: Initiative.current()});
    },
    onDiceRoll(d) {
        this.resolve(d[0].value, d[1].value);
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve(this.state.die1, this.state.die2);
    },
    onNextPlayer() {
        //console.log('next player');
        Initiative.next()
        .then((init) => {
            this.setState({initiative: init});
            this.props.events.emit('initiativechange');
        });
    },
    resolve(die1, die2) {
        Initiative.find(die1, die2)
        .then((init) => {
            this.setState({die1: die1, die2: die2, initiative: init});
            this.props.events.emit('initiativechange');
        })
        .catch((err) => {
            this.setState({die1: die1, die2: die2, initiative: ''});
            log.error(err);
        });
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)', flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Initiative</Text>
                <View style={{flex: 2, marginRight: 5}}>
                <IconButton image={this.state.initiative.toLowerCase()} width={80} height={80} onPress={this.onNextPlayer}/>
                </View>
                <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
            </View>
        );
        //<Text style={{flex: 2, fontSize: 28, fontWeight: 'bold', marginVertical: 20}}>{this.state.initiative}</Text>
    }
});

module.exports = AdminInitiativeView;
