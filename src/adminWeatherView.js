'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var DiceRoll = require('./widgets/diceRoll');
var Weather = require('./services/weather');

var AdminWeatherView = React.createClass({
    getInitialState() {
        return {
            weather: Weather.current(),
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
        this.setState({weather: Weather.current()});
    },
    onDiceRoll(d) {
        let dice = {die1: d[0].value};
        if (d.length > 1) {
            dice.die2 = d[1].value;
        }
        if (d.length > 2) {
            dice.die3 = d[2].value;
        }
        if (d.length > 3) {
            dice.die4 = d[3].value;
        }
        this.resolve(dice.die1, dice.die2, dice.die3, dice.die4);
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve(this.state.die1, this.state.die2, this.state.die3, this.state.die4);
    },
    resolve(die1, die2, die3, die4) {
        Weather.find(die1, die2, die3, die4)
        .then((wx) => {
            this.setState({die1: die1, die2: die2, die3: die3, die4: die4, weather: wx});
        });
    },
    render() {
        let wxdice = Weather.dice();
        let dice = [
            {num: 1, low: 1, high: wxdice.sides, color: 'red'}
        ];
        if (wxdice.number > 1) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'white'});
        }
        if (wxdice.number > 2) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'yellow'});
        }
        if (wxdice.number > 3) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'green'});
        }
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)', flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Weather</Text>
                <Text style={{flex: 2, fontSize: 28, fontWeight: 'bold', marginVertical: 20}}>{this.state.weather}</Text>
                <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]}
                        onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
            </View>
        );
    }
});

module.exports = AdminWeatherView;
