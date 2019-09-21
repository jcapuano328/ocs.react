import React from 'react';
import { View, Text } from 'react-native';
import {Style,MultiSelectList,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Air from '../services/air';

let AirFlakView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red',dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white',dotcolor:'black'},
        {num: 1, low: 1, high: 6, color: 'yellow',dotcolor:'black'}
    ],
    getInitialState() {
        return {
            size: '1',
            base: 'None',
            port: '0',
            patrol: 'No Patrol',
            hq: false,
            trainbusting: false,

            results: '',
            die1: 1,
            die2: 1,
            die3: 1
        };
    },
    onChangeSize(v) {
        this.state.size = v;
        this.resolve();
    },
    onChangeBase(v) {
        this.state.base = v;
        this.resolve();
    },
    onChangeShip(v) {
        this.state.port = v;
        this.resolve();
    },
    onChangePatrol(v) {
        this.state.patrol = v;
        this.resolve();
    },
    onChangeHQ(v) {
        this.state.hq = v;
        this.resolve();
    },
    onChangeTrainbusting(v) {
        this.state.trainbusting = v;
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
        let results = Air.flak(+this.state.size,this.state.base,this.state.patrol,+this.state.port,this.state.hq,this.state.trainbusting,
                                this.state.die1,this.state.die2,this.state.die3);
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>
                <View style={{flex: 8, flexDirection: 'row', marginTop: 10}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Mission Size'} direction={'vertical'} 
                            buttons={[1,2,3,4,5,6,7,8,9,10].map((s) => {
                                return {label: s.toString(), value: s}
                            })} 
                            state={this.state.size}
                            onSelected={this.onChangeSize} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Ship/Port'} direction={'vertical'} 
                            buttons={[0,1,2,3,4,5,6,7,8,9,10].map((s) => {
                                return {label: s.toString(), value: s}
                            })} 
                            state={this.state.port}
                            onSelected={this.onChangeShip} />                        
                        
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <RadioButtonGroup title={'Air Base'} direction={'vertical'} 
                            buttons={Air.bases.map((s) => {
                                return {label: s, value: s}
                            })} 
                            state={this.state.base}
                            onSelected={this.onChangeBase} />                        
                    </View>
                    <View style={{flex: 1.75}}>  
                        <View style={{flex:2}}>
                            <RadioButtonGroup title={'Patrol Zone'} direction={'vertical'} 
                                buttons={Air.zones.map((s) => {
                                    return {label: s, value: s}
                                })} 
                                state={this.state.patrol}
                                onSelected={this.onChangePatrol} />                        
                        </View>                        
                        <View style={{flex:3, justifyContent: 'center'}}>
                            <MultiSelectList 
                                items={[{name: 'HQ', selected: this.state.hq},
                                        {name: 'Trainbusting in PZ', selected: this.state.trainbusting}]}
                                onChanged={(m) => {
                                    if (m.name == 'HQ') {this.onChangeHQ(m.selected);}
                                    else if (m.name == 'Trainbusting in PZ') {this.onChangeTrainbusting(m.selected);}
                                }}
                            />                        
                        </View>                                                  
                    </View>
                </View>                
            </View>
        );
    }
});

module.exports = AirFlakView;