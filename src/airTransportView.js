'use strict'

var React = require('react');
import { View, Text, Picker } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectDropdown = require('./widgets/selectDropdown');
var Checkbox = require('./widgets/checkbox');
var DiceRoll = require('./widgets/diceRoll');
var Air = require('./services/air');

let AirTransportView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            type: Air.transportTypes[0],
            status: Air.transportStatuses[0],
            terrain: Air.transportTerrains[0],
            soviet: false,
            allied: false,
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeType(v) {
        this.state.type = v;
        this.resolve();
    },
    onChangeStatus(v) {
        this.state.status = v;
        this.resolve();
    },
    onChangeTerrain(v) {
        this.state.terrain = v;
        this.resolve();
    },
    onChangeSoviet(v) {
        this.state.soviet = v;
        this.resolve();
    },
    onChangeAllied(v) {
        this.state.allied = v;
        this.resolve();
    },

    onDiceRoll(d) {
        //this.setState({die1: d[0].value,die2: d[1].value});
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        //let state = {};
        //state['die'+d] = v;
        //this.setState(state);
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let results = Air.transport(this.state.type,this.state.status,this.state.terrain,(this.state.soviet||this.state.allied),
                                    this.state.die1,this.state.die2);
        this.state.results = results;
        this.setState(this.state);
        //this.setState({results: results});
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Type</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Status</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Terrain</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SelectDropdown values={Air.transportTypes} value={this.state.type} onSelected={this.onChangeType} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SelectDropdown values={Air.transportStatuses} value={this.state.status} onSelected={this.onChangeStatus} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SelectDropdown values={Air.transportTerrains} value={this.state.terrain} onSelected={this.onChangeTerrain} />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'flex-start', marginTop: 20}}>
                            <Checkbox label={'Soviet'} selected={this.state.soviet} onSelected={this.onChangeSoviet}/>
                            <Checkbox label={'Allied pre-Aug 44'} selected={this.state.allied} onSelected={this.onChangeAllied}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
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

module.exports = AirTransportView;
