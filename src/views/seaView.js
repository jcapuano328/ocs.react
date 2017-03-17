import React from 'react';
import { View, Text } from 'react-native';
import {Style,SpinNumeric,SelectList,MultiSelectList/*,Checkbox*/} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Sea from '../services/sea';
import Terrain from '../services/terrain';

let SeaView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        return {
            terrain: Sea.terrains[0],
            coastalarty: '0',
            nondgadj: false,
            dgadj: false,
            ship: false,
            zoc: false,
            elite: false,
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeTerrain(v) {
        this.state.size = v;
        this.resolve();
    },
    onChangeCoastalArty(v) {
        this.state.coastalarty = v;
        this.resolve();
    },
    onChangeShip(v) {
        this.state.ship = v;
        this.resolve();
    },
    onChangeDGAdj(v) {
        this.state.dgadj = v;
        this.resolve();
    },
    onChangeNonDGAdj(v) {
        this.state.nondgadj = v;
        this.resolve();
    },
    onChangeZOC(v) {
        this.state.zoc = v;
        this.resolve();
    },
    onChangeElite(v) {
        this.state.elite = v;
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
        this.state.results = Sea.amphiblanding(this.state.terrain,+this.state.coastalarty,this.state.ship,this.state.nondgadj,
                                                this.state.dgadj,this.state.zoc,this.state.elite,this.state.die1,this.state.die2);         
        this.setState(this.state);        
    },
    render() {
        return (
            <View style={{flex: 1, paddingTop: 4}}>
                <View style={{flex:.5, marginLeft:10}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>Amphibious Landing</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>                                                
                <View style={{flex: 3, flexDirection: 'row', marginLeft:10}}>
                    <View style={{flex: 3}}>
                        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Text style={{fontSize: Style.Font.medium()}}>Coastal Arty</Text>
                            </View>
                            <View style={{flex:2, justifyContent: 'center'}}>
                                <SpinNumeric value={this.state.coastalarty} min={0} max={20} onChanged={this.onChangeCoastalArty} />
                            </View>
                        </View>
                        <View style={{flex:5, justifyContent: 'center'}}>
                            <MultiSelectList 
                                items={[{name: 'Naval Support', selected: this.state.ship},
                                        {name: 'Non-DG Unit Adjacent', selected: this.state.nondgadj},
                                        {name: 'DG Unit Adjacent', selected: this.state.dgadj},
                                        {name: 'In Enemy ZOC', selected: this.state.zoc},
                                        {name: 'All Commando/Marine/SP', selected: this.state.elite}]}
                                onChanged={(m) => {
                                    if (m.name == 'Naval Support') {this.onChangeShip(m.selected);}
                                    else if (m.name == 'Non-DG Unit Adjacent') {this.onChangeNonDGAdj(m.selected);}
                                    else if (m.name == 'DG Unit Adjacent') {this.onChangeDGAdj(m.selected);}
                                    else if (m.name == 'In Enemy ZOC') {this.onChangeZOC(m.selected);}
                                    else if (m.name == 'All Commando/Marine/SP') {this.onChangeElite(m.selected);}                                    
                                }}
                            />                        
                            
                            {/*
                            <View style={{flex:1, justifyContent: 'flex-start', marginLeft: 20}}>
                                <Checkbox label={'Naval Support'} selected={this.state.ship} onSelected={this.onChangeShip}/>
                                <Checkbox label={'Non-DG Unit Adjacent'} selected={this.state.nondgadj} onSelected={this.onChangeNonDGAdj}/>
                                <Checkbox label={'DG Unit Adjacent'} selected={this.state.dgadj} onSelected={this.onChangeDGAdj}/>
                                <Checkbox label={'In Enemy ZOC'} selected={this.state.zoc} onSelected={this.onChangeZOC}/>
                                <Checkbox label={'All Commando/Marine/SP'} selected={this.state.elite} onSelected={this.onChangeElite}/>                                
                            </View>
                            */}
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <SelectList title={'Terrain'} titleonly={true} items={Sea.terrains} selected={this.state.terrain} onChanged={this.onChangeTerrain}/>
                    </View>
                </View>
                <View style={{flex:4}} />
            </View>
        );
    }
});

module.exports = SeaView;