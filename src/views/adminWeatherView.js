import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import {Style} from 'react-native-nub';
import Weather from '../services/weather';
import getWeather from '../selectors/weather';
import {setWeather} from '../actions/current';

const diecolors = ['red', 'white',   'black', 'black', 'yellow', 'blue',  'green', 'purple', 'gray', 'olive', 'sienna'];
const dotcolors = ['white', 'black', 'red',   'white', 'black',  'white', 'white', 'white',  'white', 'white', 'white'];

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
		let weathers = this.props.wx;
		if (!Array.isArray(weathers)) {
			weathers = [weathers];			
		}
		let currentwx = '';
		weathers.forEach(wx => {
			let wxres = Weather.find(this.props.turn, wx, die1, die2, die3, die4);
			if (currentwx) {
				currentwx += '\r\n';
			}
			currentwx += wxres;
		});
		
        this.props.setWeather(currentwx);        
    },
    render() {
        let dice = [];

		let weathers = this.props.wx;
		if (!Array.isArray(weathers)) {
			weathers = [weathers];			
        }
        let wxdicenumber = 0;
		weathers.forEach(wx => {
            let wxdice = wx.dice;
            for (var i = 0; i < wxdice.number; i++) {
                dice.push({num: 1, low: 1, high: wxdice.sides, color: diecolors[wxdicenumber+i], dotcolor: dotcolors[wxdicenumber+i]});
            }
            wxdicenumber += wxdice.number;
		});
        
        let resultsflex = wxdicenumber > 3 ? 2 : 3;
        let diceflex = wxdicenumber > 3 ? 3 : 2;
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