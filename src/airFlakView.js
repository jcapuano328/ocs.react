'use strict'

var React = require('react');
import { View, Text, Picker } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectDropdown = require('./widgets/selectDropdown');
var Checkbox = require('./widgets/checkbox');
var DiceRoll = require('./widgets/diceRoll');
var Air = require('./services/air');

let AirFlakView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'yellow'}
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
        let results = Air.flak(+this.state.size,this.state.base,this.state.patrol,+this.state.port,this.state.hq,this.state.trainbusting,
                                this.state.die1,this.state.die2,this.state.die3);
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
                            <Text style={{marginLeft: 10}}>Mission Size</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Air Base</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Ship/Port</Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>Patrol Zone</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.size} min={1} max={10} onChanged={this.onChangeSize} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SelectDropdown values={Air.bases} value={this.state.base} onSelected={this.onChangeBase} />
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <SpinNumeric value={this.state.port} min={0} max={10} onChanged={this.onChangeShip} />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <SelectDropdown values={Air.zones} value={this.state.patrol} onSelected={this.onChangePatrol} />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'flex-start'}}>
                            <Checkbox label={'HQ'} selected={this.state.hq} onSelected={this.onChangeHQ}/>
                            <Checkbox label={'Trainbusting in PZ'} selected={this.state.trainbusting} onSelected={this.onChangeTrainbusting}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{marginTop: 35, fontSize: 20, fontWeight: 'bold'}}>{this.state.results}</Text>
                    </View>
                    <View style={{flex: 2, marginRight: 15}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3]}
                        onRoll={this.onDiceRoll}
                        onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = AirFlakView;
