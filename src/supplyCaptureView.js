'use strict'

var React = require('react');
import { View, Text } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
var SpinNumeric = require('./widgets/spinNumeric');
var DiceRoll = require('./widgets/diceRoll');
var Supply = require('./services/supply');

let SupplyCaptureView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'blue'}
    ],
    getInitialState() {
        return {
            mode: 0,
            unit: '0',
            sp: '0',
            token: '0',
            results: '',
            capturedunit: '0',
            capturedsp: '0',
            capturedtoken: '0',
            remainingunit: '0',
            remainingsp: '0',
            remainingtoken: '0',
            die1: 1
        };
    },
    onChangeMode(v) {
        this.state.mode = v;
        this.resolve();
    },
    onChangeUnit(v) {
        this.state.unit = v;
        this.resolve();
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
        let results = Supply.capture(this.state.mode,+this.state.unit,+this.state.sp,+this.state.token,this.state.die1);
        this.state.results = results.result;
        this.state.capturedunit = results.capturedunit;
        this.state.capturedsp = results.capturedsp;
        this.state.capturedtoken = results.capturedtoken;
        this.state.remainingunit = results.remainingunit;
        this.state.remainingsp = results.remainingsp;
        this.state.remainingtoken = results.remainingtoken;

        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex:1}}>
                        <RadioForm
                          style={{marginLeft: 25, marginTop: 15}}
                          radio_props={[{label: 'Supply Dump', value: 0 }, {label: 'Trucks', value: 1 },, {label: 'Wagons', value: 2 }]}
                          initial={this.state.mode}
                          formHorizontal={true}
                          labelHorizontal={true}
                          buttonColor={'#2196f3'}
                          animation={true}
                          onPress={this.onChangeMode}
                        />
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex:1}}/>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Unit</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Supply</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Tokens</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{marginLeft: 10}}>Start</Text>
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric value={this.state.unit} min={0} max={20} onChanged={this.onChangeUnit} />
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric value={this.state.sp} min={0} max={100} onChanged={this.onChangeSP} />
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric value={this.state.token} min={0} max={3} onChanged={this.onChangeToken} />
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{marginLeft: 10}}>Captured</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.capturedunit}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.capturedsp}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.capturedtoken}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Text style={{marginLeft: 10}}>Remaining</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.remainingunit}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.remainingsp}</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>{this.state.remainingtoken}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 15}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = SupplyCaptureView;
