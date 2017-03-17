import React from 'react';
import { View, Text } from 'react-native';
import {Style,SpinNumeric} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Supply from '../services/supply';

let SupplyDestructionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'green', dotcolor:'white'}
    ],
    getInitialState() {
        return {
            sp: '0',
            token: '0',
            results: '',
            remainingsp: '0',
            remainingtoken: '0',
            die1: 1
        };
    },
    onChangeSP(v) {
        this.state.sp = v;
        this.resolve();
    },
    onChangeToken(v) {
        this.state.token = v;
        this.resolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let results = Supply.destroy(+this.state.sp,+this.state.token,this.state.die1);
        this.state.results = results.result;
        this.state.remainingsp = results.remainingsp;
        this.state.remainingtoken = results.remainingtoken;

        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>                                
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium()}}>Supply</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium()}}>Tokens</Text>
                    </View>
                    <View style={{flex:1}} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), marginLeft: 10}}>Start</Text>
                    </View>
                    <View style={{flex:1}}>
                        <SpinNumeric value={this.state.sp} min={0} max={100} onChanged={this.onChangeSP} />
                    </View>
                    <View style={{flex:1}}>
                        <SpinNumeric value={this.state.token} min={0} max={3} onChanged={this.onChangeToken} />
                    </View>
                    <View style={{flex:1}} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), marginLeft: 10}}>Remaining</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold'}}>{this.state.remainingsp}</Text>
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold'}}>{this.state.remainingtoken}</Text>
                    </View>
                    <View style={{flex:1}} />
                </View>
                <View style={{flex:5}} />
            </View>
        );
    }
});

module.exports = SupplyDestructionView;