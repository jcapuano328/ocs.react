import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import {Style} from 'react-native-nub';
import Weather from '../services/weather';
import getWeather from '../selectors/weather';
import {setWeather} from '../actions/current';

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
        
        let resultsflex = wxdice.number > 3 ? 2 : 3;
        let diceflex = wxdice.number > 3 ? 3 : 2;
        return (            
            <View style={{flex: 1.1, paddingTop: 2}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'left', paddingLeft:10}}>Weather</Text>
                <View style={{flex: 1, flexDirection: 'row', paddingTop: 4}}>
                    <View style={{flex: resultsflex, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{this.props.weather}</Text>
                    </View>                
                    <View style={{flex: diceflex}}>
                        <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>                        
                    </View>                
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

const mapDispatchToProps = ({setWeather});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWeatherView);