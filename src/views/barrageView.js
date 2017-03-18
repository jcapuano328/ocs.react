import React from 'react';
import { View, Text } from 'react-native';
import {Style,RadioButtonGroup,SelectList,MultiSelectList/*,SelectDropdown,Checkbox*/} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import BarrageResultsView from './barrageResultsView';
import Barrage from '../services/barrage';
import Terrain from '../services/terrain';

let BarrageView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red',dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white',dotcolor:'black'},
        {num: 1, low: 1, high: 6, color: 'yellow',dotcolor:'black'}
    ],
    getInitialState() {
        return {
            type: Barrage.defaultType,
            size: Barrage.defaultSize,
            strength: Barrage.defaultStrength,
            terrain: 'Open',
            spotter: true,
            hedgehog: false,
            stratmode: false,
            airclosetobase: false,

            results: '',
            die1: 1,
            die2: 1,
            die3: 1
        };
    },
    onChangeType(v) {
        this.setState({type: v, strength: Barrage.strengths(v)[0], results: ''});
    },
    onChangeSize(v) {
        this.state.size = v;
        this.resolve();
    },
    onChangeStrength(v) {
        this.state.strength = v;
        this.resolve();
    },
    onChangeTerrain(t) {
        this.state.terrain = t;
        this.resolve();
    },
    onChangeSpotter(b) {
        this.state.spotter = b;
        this.resolve();
    },
    onChangeHedgehog(b) {
        this.state.hedgehog = b;
        this.resolve();
    },
    onChangeStratMode(b) {
        this.state.stratmode = b;
        this.resolve();
    },
    onChangeAirCloseToBase(b) {
        this.state.airclosetobase = b;
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
        let results = Barrage.resolve(this.state.type,this.state.size,this.state.strength,this.state.terrain,
            this.state.spotter,this.state.hedgehog,this.state.stratmode,this.state.airclosetobase,
            this.state.die1,this.state.die2,this.state.die3);
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 4}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', alignSelf:'center'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>
                <View style={{flex:2, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <RadioButtonGroup title={'Type'} direction={'vertical'} 
                            buttons={Barrage.types.map((t) => {
                                return {label: t, value: t}
                            })} 
                            state={this.state.type}
                            onSelected={this.onChangeType} />                        
                    </View>                    
                    <View style={{flex:2}}>
                        <BarrageResultsView strength={this.state.strength} 
                            results={Barrage.resolvePossible(
                                this.state.type,this.state.size,this.state.strength,this.state.terrain,
                                this.state.spotter,this.state.hedgehog,this.state.stratmode,this.state.airclosetobase,
                                this.state.die1,this.state.die2                         
                            )} 
                        />                    
                    </View>
                </View>
                <View style={{flex: 5, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <RadioButtonGroup title={'Strength'} direction={'vertical'} 
                            buttons={Barrage.strengths(this.state.type).map((s) => {
                                return {label: s, value: s}
                            })} 
                            state={this.state.strength}
                            onSelected={this.onChangeStrength} />                        
                    </View>                        
                    <View style={{flex:1}}>
                        <RadioButtonGroup title={'Density'} direction={'vertical'} 
                            buttons={Barrage.sizes.map((s) => {
                                return {label: s, value: s}
                            })} 
                            state={this.state.size}
                            onSelected={this.onChangeSize} />                        
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <View style={{flex:2}}>
                            <SelectList title={'Terrain'} titleonly={true} items={Terrain.inside().map((t) => t.desc)} selected={this.state.terrain} onChanged={this.onChangeTerrain}/>
                        </View>
                        <View style={{flex:1}}>
                            <MultiSelectList title={'Modifiers'}
                                items={[
                                    {name: 'Spotter', selected: this.state.spotter},
                                    {name: 'Hedgehog', selected: this.state.hedgehog},
                                    {name: 'Strat Mode', selected: this.state.stratmode},
                                    {name: 'Air Close to Base', selected: this.state.airclosetobase},
                                ]}
                                onChanged={(m) => {
                                    if (m.name == 'Spotter') {this.onChangeSpotter(m.selected);}
                                    else if (m.name == 'Hedgehog') {this.onChangeHedgehog(m.selected);}
                                    else if (m.name == 'Strat Mode') {this.onChangeStratMode(m.selected);}
                                    else if (m.name == 'Air Close to Base') {this.onChangeAirCloseToBase(m.selected);}                                
                                }}
                            />
                        </View>
                    </View>                    
                </View>                
            </View>
        );
    }
});

module.exports = BarrageView;
