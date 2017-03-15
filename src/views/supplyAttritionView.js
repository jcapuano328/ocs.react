import React from 'react';
import { View, Text } from 'react-native';
import {Style,SpinNumeric,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Supply from '../services/supply';

let SupplyAttritionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            ar: '0',
            steps: 0,
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeAR(v) {
        this.state.ar = v;
        this.resolve();
    },
    onChangeSteps(v) {
        this.state.steps = v;
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
        let results = Supply.attrition(+this.state.ar,this.state.steps,this.state.die1,this.state.die2);
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{marginLeft: 10}}>AR</Text>
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric value={this.state.ar} min={0} max={5} onChanged={this.onChangeAR} />
                        </View>
                        <View style={{flex:2}}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Steps</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <RadioButtonGroup buttons={[{label: '< 5', value: 0}, {label: '5+', value: 1}]} state={this.state.steps}
                                onSelected={this.onChangeSteps} />
                        </View>
                        <View style={{flex:2}}/>
                    </View>
                </View>
                <View style={{flex: 3, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 35, fontSize: Style.Font.medium(), fontWeight: 'bold'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 15}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = SupplyAttritionView;