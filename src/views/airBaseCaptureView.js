import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup,Checkbox} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Air from '../services/air';

let AirBaseCaptureView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        return {
            state: 0,//Air.states[0],
            advance: false,
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeState(v) {
        this.state.state = v;
        this.resolve();
    },
    onChangeAdvance(v) {
        this.state.advance = v;
        this.resolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let results = Air.capture(Air.states[this.state.state],this.state.advance,this.state.die1,this.state.die2);
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>                
                
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .5, justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), marginLeft: 10}}>State</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>                        
                        <RadioButtonGroup buttons={[{label: 'Active', value: 0}, {label: 'Inactive', value: 1}]} state={this.state.state}
                            onSelected={this.onChangeState} />
                    </View>
                    <View style={{flex: 1, alignItems:'center'}}>                        
                        <Checkbox label={'Advance after Combat'} selected={this.state.advance} onSelected={this.onChangeAdvance}/>
                    </View>
                </View>
                <View style={{flex:6}} />
            </View>
        );
    }
});

module.exports = AirBaseCaptureView;