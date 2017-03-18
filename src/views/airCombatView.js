import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup/*,SpinNumeric*/} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Air from '../services/air';

let AirCombatView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, color: 'yellow', dotcolor:'black'}
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
        this.state.attack = v;
        this.resolve();
    },
    onChangeDefend(v) {
        this.state.defend = v;
        this.resolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        var results = Air.combat(+this.state.attack,+this.state.defend,this.state.die1,this.state.die2,this.state.die3);
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>                
                <View style={{flex: 3, marginTop: 10}}>                    
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Attacker'} direction={'horizontal'} 
                            buttons={[0,1,2,3,4,5,6,7,8,9,10].map((s) => {
                                return {label: s.toString(), value: s}
                            })} 
                            state={this.state.attack}
                            onSelected={this.onChangeAttack} />                        
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Defender'} direction={'horizontal'} 
                            buttons={[0,1,2,3,4,5,6,7,8,9,10].map((s) => {
                                return {label: s.toString(), value: s}
                            })} 
                            state={this.state.defend}
                            onSelected={this.onChangeDefend} />                        
                    </View>                    
                </View>    
                <View style={{flex: 5}} />
            </View>
        );
    }
});

module.exports = AirCombatView;
