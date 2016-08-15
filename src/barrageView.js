'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var SelectDropdown = require('./widgets/selectDropdown');
var Checkbox = require('./widgets/checkbox');
var DiceRoll = require('./widgets/diceRoll');
var Barrage = require('./services/barrage');
var Terrain = require('./services/terrain');

let BarrageView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'yellow'}
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
        //this.setState({size: v});
        this.state.size = v;
        this.resolve();
    },
    onChangeStrength(v) {
        //this.setState({strength: v});
        this.state.strength = v;
        this.resolve();
    },
    onChangeTerrain(t) {
        //this.setState({terrain: t});
        this.state.terrain = t;
        this.resolve();
    },
    onChangeSpotter(b) {
        //this.setState({spotter: b});
        this.state.spotter = b;
        this.resolve();
    },
    onChangeHedgehog(b) {
        //this.setState({hedgehog: b});
        this.state.hedgehog = b;
        this.resolve();
    },
    onChangeStratMode(b) {
        //this.setState({stratmode: b});
        this.state.stratmode = b;
        this.resolve();
    },
    onChangeAirCloseToBase(b) {
        //this.setState({airclosetobase: b});
        this.state.airclosetobase = b;
        this.resolve();
    },

    onDiceRoll(d) {
        //this.setState({die1: d[0].value,die2: d[1].value, die3: d[2].value});
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
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
        let results = Barrage.resolve(this.state.type,this.state.size,this.state.strength,this.state.terrain,
            this.state.spotter,this.state.hedgehog,this.state.stratmode,this.state.airclosetobase,
            this.state.die1,this.state.die2,this.state.die3);
        //this.setState({results: results});
        this.state.results = results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SelectDropdown label={'Type'} values={Barrage.types} value={this.state.type} onSelected={this.onChangeType} />
                        </View>
                        <View style={{flex:1}}>
                            <SelectDropdown label={'REs'} values={Barrage.sizes} value={this.state.size} onSelected={this.onChangeSize} />
                        </View>
                        <View style={{flex:1}}>
                            <SelectDropdown label={'Strength'} values={Barrage.strengths(this.state.type)} value={this.state.strength} onSelected={this.onChangeStrength} />
                        </View>
                        <View style={{flex:1}}>
                            <SelectDropdown label={'Terrain'} values={Terrain.inside().map((t) => t.desc)} value={this.state.terrain} onSelected={this.onChangeTerrain} />
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Checkbox label={'Spotter'} selected={this.state.spotter} onSelected={this.onChangeSpotter}/>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Checkbox label={'Hedgehog'} selected={this.state.hedgehog} onSelected={this.onChangeHedgehog}/>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Checkbox label={'Strat Mode'} selected={this.state.stratmode} onSelected={this.onChangeStratMode}/>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <Checkbox label={'Air Close to Base'} selected={this.state.airclosetobase} onSelected={this.onChangeAirCloseToBase}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex: 2, marginRight: 15}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                            onRoll={this.onDiceRoll}
                            onDieChanged={this.onDieChanged} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = BarrageView;
