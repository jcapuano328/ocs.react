import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import Weather from '../services/weather';
import getWeather from '../selectors/weather';
import {setWeather,save} from '../actions/current';

var AdminWeatherView = React.createClass({
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
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
        this.setState({die1: die1, die2: die2, die3: die3, die4: die4});
        this.props.setWeather(Weather.find(this.props.turn, this.props.wx, die1, die2, die3, die4));
        this.props.save().done();
    },
    render() {
        let wxdice = this.props.wx.dice;
        let dice = [
            {num: 1, low: 1, high: wxdice.sides, color: 'red', dotcolor:'white'}
        ];
        if (wxdice.number > 1) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'white', dotcolor:'black'});
        }
        if (wxdice.number > 2) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'yellow', dotcolor:'black'});
        }
        if (wxdice.number > 3) {
            dice.push({num: 1, low: 1, high: wxdice.sides, color: 'green', dotcolor:'white'});
        }
        return (            
            <View style={{flex: 1,flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Weather</Text>
                <Text style={{flex: 2, fontSize: 28, fontWeight: 'bold', marginVertical: 20}}>{this.props.weather}</Text>
                <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]}
                        onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    wx: getWeather(state),
    turn: state.current.turn,
    weather: state.current.weather
});

const mapDispatchToProps = ({setWeather,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWeatherView);