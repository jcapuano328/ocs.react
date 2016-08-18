'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var SelectDropdown = require('./widgets/selectDropdown');
import RadioForm from 'react-native-simple-radio-button';
var Checkbox = require('./widgets/checkbox');
var DiceRoll = require('./widgets/diceRoll');
var Air = require('./services/air');

let AirBaseCaptureView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            state: 0,//Air.states[0],
            advance: false,
            results: '',
            die1: 1,
            die2: 1
        };
    },
    onChangeState(v) {
        this.state.state = v;
        this.resolve();
    },
    onChangeAdvance(v) {
        this.state.advance = v;
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
        let results = Air.capture(Air.states[this.state.state],this.state.advance,this.state.die1,this.state.die2);
        this.state.results = results;
        this.setState(this.state);
        //this.setState({results: results});
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: .5}}>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{marginLeft: 10}}>State</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                            <RadioForm
                              radio_props={[{label: 'Active', value: 0 }, {label: 'Inactive', value: 1 }]}
                              initial={this.state.state}
                              formHorizontal={true}
                              labelHorizontal={true}
                              buttonColor={'#2196f3'}
                              animation={true}
                              onPress={this.onChangeState}
                            />
                        </View>
                    </View>
                    <View style={{flex: 2}}>
                        <View style={{flex:1, justifyContent: 'center', marginLeft: 20}}>
                            <Checkbox label={'Advance after Combat'} selected={this.state.advance} onSelected={this.onChangeAdvance}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'flex-start'}}>
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
        //<SelectDropdown values={Air.states} value={this.state.state} onSelected={this.onChangeState} />
    }
});

module.exports = AirBaseCaptureView;
