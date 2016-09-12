'use strict'

var React = require('react');
import { View, Text, Picker } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
var SpinNumeric = require('./widgets/spinNumeric');
var IconButton = require('./widgets/iconButton');
var Checkbox = require('./widgets/checkbox');
var SelectList = require('./widgets/selectList');
var DiceRoll = require('./widgets/diceRoll');
var Ground = require('./services/ground');
var Terrain = require('./services/terrain');

let GroundView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'yellow'},
        {num: 1, low: 1, high: 6, color: 'blackr'},
        {num: 1, low: 1, high: 6, color: 'blackw'}
    ],
    getInitialState() {
        let terrain = Terrain.inside()[0];
        return {
            attackArmor: '0',
            attackMech: '0',
            attackOther: '0',
            attackAR: '3',
            attackCS: true,
            attackTS: true,

            defendArmor: '0',
            defendMech: '0',
            defendOther: '0',
            defendAR: '3',
            defendHH: '0',
            defendCS: true,
            defendTS: true,

            terrain: terrain.desc,
            between: '',
            density: terrain.density,

            combatMode: 0,

            odds: '1:1',
            surprise: '',
            results: '',

            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1
        };
    },
    onChangeAttackArmor(v) {
        this.state.attackArmor = v;
        this.resolve();
    },
    onChangeAttackMech(v) {
        this.state.attackMech = v;
        this.resolve();
    },
    onChangeAttackOther(v) {
        this.state.attackOther = v;
        this.resolve();
    },
    onChangeAttackAR(v) {
        this.state.attackAR = v;
        this.resolve();
    },
    onChangeAttackCS(b) {
        this.state.attackCS = b;
        this.resolve();
    },
    onChangeAttackTS(b) {
        this.state.attackTS = b;
        this.resolve();
    },

    onChangeDefendArmor(v) {
        this.state.defendArmor = v;
        this.resolve();
    },
    onChangeDefendMech(v) {
        this.state.defendMech = v;
        this.resolve();
    },
    onChangeDefendOther(v) {
        this.state.defendOther = v;
        this.resolve();
    },
    onChangeDefendAR(v) {
        this.state.defendAR = v;
        this.resolve();
    },
    onChangeDefendHH(v) {
        this.state.defendHH = v;
        this.resolve();
    },
    onChangeDefendCS(b) {
        this.state.defendCS = b;
        this.resolve();
    },
    onChangeDefendTS(b) {
        this.state.defendTS = b;
        this.resolve();
    },

    onChangeMode(v) {
        this.state.combatMode = v;
        this.resolve();
    },
    onChangeTerrain(t) {
        let terrain = Terrain.find(t);
        this.state.terrain = terrain.desc;
        this.state.density = terrain.density;
        this.resolve();
    },
    onChangeTerrainBetween(t) {
        this.state.between = t;
        this.resolve();
    },
    onChangeOdds(v) {
        this.resolve(v);
    },

    onReset() {
        let terrain = Terrain.inside()[0];
        this.setState({
            attackArmor: '0',
            attackMech: '0',
            attackOther: '0',
            attackAR: '3',
            attackCS: true,
            attackTS: true,

            defendArmor: '0',
            defendMech: '0',
            defendOther: '0',
            defendAR: '3',
            defendHH: '0',
            defendCS: true,
            defendTS: true,

            terrain: terrain.desc,
            between: '',
            density: terrain.density,

            combatMode: 0
        });
    },

    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.state.die5 = d[4].value;
        this.resolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve();
    },
    resolve(odds) {
        odds = odds || Ground.calc(
            +this.state.attackArmor,+this.state.attackMech,+this.state.attackOther,this.state.attackCS,this.state.attackTS,
            +this.state.defendArmor,+this.state.defendMech,+this.state.defendOther,this.state.defendCS,this.state.defendTS,
            this.state.terrain,this.state.between
        );
        var result = Ground.resolve(odds,
            +this.state.attackAR,+this.state.defendAR,+this.state.defendHH,this.state.terrain,this.state.combatMode,
            this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5
        );
        this.state.odds = result.odds;
        this.state.surprise = result.surprise;
        this.state.results = result.results;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <GroundHeader onReset={this.onReset}/>
                        <GroundInput label={'Armor'} attack={this.state.attackArmor} defend={this.state.defendArmor} onChangeAttack={this.onChangeAttackArmor} onChangeDefend={this.onChangeDefendArmor} />
                        <GroundInput label={'Mech'} attack={this.state.attackMech} defend={this.state.defendMech} onChangeAttack={this.onChangeAttackMech} onChangeDefend={this.onChangeDefendMech} />
                        <GroundInput label={'Other'} attack={this.state.attackOther} defend={this.state.defendOther} onChangeAttack={this.onChangeAttackOther} onChangeDefend={this.onChangeDefendOther} />
                        <GroundInput label={'AR'} min={-1} max={5} attack={this.state.attackAR} defend={this.state.defendAR} onChangeAttack={this.onChangeAttackAR} onChangeDefend={this.onChangeDefendAR} />
                        <GroundInputDefend label={'Hedgehog'} defend={this.state.defendHH} onChangeDefend={this.onChangeDefendHH} />
                        <GroundCheck label={'Combat'} attack={this.state.attackCS} defend={this.state.defendCS} onChangeAttack={this.onChangeAttackCS} onChangeDefend={this.onChangeDefendCS} />
                        <GroundCheck label={'Trace'} attack={this.state.attackTS} defend={this.state.defendTS} onChangeAttack={this.onChangeAttackTS} onChangeDefend={this.onChangeDefendTS} />
                        <GroundType value={this.state.combatMode} onChanged={this.onChangeMode} />
                    </View>
                    <View style={{flex: 2, alignItems: 'center'}}>
                        <View style={{flex: 3}}>
                            <SelectList title={'Terrain'} items={Terrain.inside().map((t) => t.desc)} selected={this.state.terrain} onChanged={this.onChangeTerrain}/>
                        </View>
                        <View style={{flex: 1}}>
                            <SelectList title={'Between'} items={Terrain.between().map((t) => t.desc)} selected={this.state.between} onChanged={this.onChangeTerrainBetween}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <OddsView odds={Ground.odds(this.state.density)} value={this.state.odds} onChanged={this.onChangeOdds}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.surprise}</Text>
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                            onRoll={this.onDiceRoll}
                            onDie={this.onDieChanged} />
                    </View>
                </View>
            </View>
        );
    }
});

let GroundHeader = React.createClass({
    render() {
        return (
            <View style={{flex: .75, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:1, alignItems: 'center', backgroundColor: '#3F51B5', marginLeft: 10, borderRadius:5}}>
                    <IconButton image={'refresh'} width={16} height={32} resizeMode={'contain'} onPress={this.props.onReset}/>
                </View>
                <View style={{flex:2, alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'Attack'}</Text>
                </View>
                <View style={{flex:2, alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'Defend'}</Text>
                </View>
            </View>
        );
    }
});

let GroundInput = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10}}>{this.props.label}</Text>
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <SpinNumeric value={this.props.attack} min={this.props.min || 0} max={this.props.max} onChanged={this.props.onChangeAttack} />
                </View>
                <View style={{flex:2, justifyContent: 'center'}}>
                    <SpinNumeric value={this.props.defend} min={this.props.min || 0} max={this.props.max} onChanged={this.props.onChangeDefend} />
                </View>
            </View>
        );
    }
});

let GroundInputDefend = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:3, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10}}>{this.props.label}</Text>
                </View>
                <View style={{flex:2}}>
                    <SpinNumeric value={this.props.defend} min={0} max={4} onChanged={this.props.onChangeDefend} />
                </View>
            </View>
        );
    }
});

let GroundCheck = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10}}>{this.props.label}</Text>
                </View>
                <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
                    <Checkbox selected={this.props.attack} onSelected={this.props.onChangeAttack}/>
                </View>
                <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
                    <Checkbox selected={this.props.defend} onSelected={this.props.onChangeDefend}/>
                </View>
            </View>
        );
    }
});

let GroundType = React.createClass({
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <RadioForm
                  radio_props={[{label: 'Regular', value: 0 }, {label: 'Overrun', value: 1 }]}
                  initial={this.props.value}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress={this.props.onChanged}
                />
            </View>
        );
    }
});

let OddsView = React.createClass({
    onChanged(v) {
        this.props.onChanged && this.props.onChanged(v);
    },
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', marginTop: 15}}>
                <Text style={{flex: 1, fontSize: 16,fontWeight: 'bold', marginLeft: 5, marginTop: 13}}>Odds</Text>
                <Picker style={{flex: 2, marginRight: 25}}
                    selectedValue={this.props.value}
                    onValueChange={this.onChanged}
                >
                    {this.props.odds.map((o,i) => {return (<Picker.Item key={i} label={o} value={o} />);})}
                </Picker>
            </View>
        );
    }
});


module.exports = GroundView;
