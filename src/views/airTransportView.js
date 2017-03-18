import React from 'react';
import { View, Text } from 'react-native';
import {Style,MultiSelectList,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Air from '../services/air';

let AirTransportView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'}
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
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve() {
        let results = Air.transport(this.state.type,this.state.status,this.state.terrain,(this.state.soviet||this.state.allied),
                                    this.state.die1,this.state.die2);
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
                
                <View style={{flex: 2, flexDirection: 'row', marginTop: 10}}>
                    <View style={{flex: 0.5, marginLeft: 10}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: Style.Font.medium()}}>Type</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: Style.Font.medium()}}>Status</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: Style.Font.medium()}}>Terrain</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <RadioButtonGroup direction={'horizontal'} 
                                buttons={Air.transportTypes.map((s) => {
                                    return {label: s, value: s}
                                })} 
                                state={this.state.type}
                                onSelected={this.onChangeType} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <RadioButtonGroup direction={'horizontal'} 
                                buttons={Air.transportStatuses.map((s) => {
                                    return {label: s, value: s}
                                })} 
                                state={this.state.status}
                                onSelected={this.onChangeStatus} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <RadioButtonGroup direction={'horizontal'} 
                                buttons={Air.transportTerrains.map((s) => {
                                    return {label: s, value: s}
                                })} 
                                state={this.state.terrain}
                                onSelected={this.onChangeTerrain} />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <MultiSelectList
                            items={[{name: 'Soviet', selected: this.state.soviet},
                                    {name: 'Allied pre-Aug 44', selected: this.state.allied}]}
                            onChanged={(m) => {
                                if (m.name == 'Soviet') {this.onChangeSoviet(m.selected);}
                                else if (m.name == 'Allied pre-Aug 44') {this.onChangeAllied(m.selected);}
                            }}
                        />                        
                    </View>
                </View>
                <View style={{flex:5}} />
            </View>
        );
    }
});

module.exports = AirTransportView;