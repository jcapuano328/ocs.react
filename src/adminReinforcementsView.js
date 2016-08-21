'use strict'

var React = require('react');
import { View, Text, Image } from 'react-native';
var Icons = require('./res/icons');
var DiceRoll = require('./widgets/diceRoll');
var Player = require('./services/player');
var Reinforcements = require('./services/reinforcements');

var AdminReinforcementsView = React.createClass({
    player1dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    player2dice: [
        {num: 1, low: 1, high: 6, color: 'blackr'},
        {num: 1, low: 1, high: 6, color: 'blackw'}
    ],
    getInitialState() {
        let reinforcements = Reinforcements.current();
        return {
            player1: reinforcements.player1,
            player2: reinforcements.player2,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        let reinforcements = Reinforcements.current();
        this.setState({player1: reinforcements.player1,player2: reinforcements.player2});
    },
    onDiceRollPlayer1(d) {
        this.resolvePlayer1(d[0].value, d[1].value);
    },
    onDieChangedPlayer1(d,v) {
        this.state['die'+d] = v;
        this.resolvePlayer1(this.state.die1, this.state.die2);
    },
    resolvePlayer1(die1, die2) {
        Reinforcements.find('player1', die1, die2)
        .then((reinforcements) => {
            this.setState({die1: die1, die2: die2, player1: reinforcements});
        })
        .catch((err) => {
            this.setState({die1: die1, die2: die2, player1: ''});
            log.error(err);
        });
    },

    onDiceRollPlayer2(d) {
        this.resolvePlayer2(d[0].value, d[1].value);
    },
    onDieChangedPlayer2(d,v) {
        this.state['die'+(d+2)] = v;
        this.resolvePlayer2(this.state.die3, this.state.die4);
    },
    resolvePlayer2(die1, die2) {
        Reinforcements.find('player2', die1, die2)
        .then((reinforcements) => {
            this.setState({die3: die1, die4: die2, player2: reinforcements});
        })
        .catch((err) => {
            this.setState({die3: die1, die4: die2, player2: ''});
            log.error(err);
        });
    },

    render() {
        let player1 = Player.player1();
        let player2 = Player.player2();

        return (
            <View>
                <View style={{flex: 1,justifyContent: 'flex-start'}}>
                    <Text style={{flex: 0.65, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Reinforcements</Text>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            style={{flex: .5, width: 52, height: 52, resizeMode: 'stretch'}}
                            source={Icons[player1.icon.toLowerCase()]} />
                        <View style={{flex: 3, alignItems: 'center'}}>
                            <Text style={{marginLeft: 10, fontSize: 28, fontWeight: 'bold'}}>{this.state.player1}</Text>
                        </View>
                        <View style={{flex: 3, marginRight: 5}}>
                            <DiceRoll dice={this.player1dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRollPlayer1} onDie={this.onDieChangedPlayer1}/>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            style={{flex: .5, width: 52, height: 52, resizeMode: 'stretch'}}
                            source={Icons[player2.icon.toLowerCase()]} />
                        <View style={{flex: 3, alignItems: 'center'}}>
                            <Text style={{marginLeft: 10, fontSize: 28, fontWeight: 'bold'}}>{this.state.player2}</Text>
                        </View>
                        <View style={{flex: 3, marginRight: 5}}>
                            <DiceRoll dice={this.player2dice} values={[this.state.die3,this.state.die4]}
                                onRoll={this.onDiceRollPlayer2} onDie={this.onDieChangedPlayer2}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

/*
<View>
    <View style={{flex: 1,justifyContent: 'flex-start'}}>
        <Text style={{flex: 0.65, fontSize: 20, marginLeft: 5, marginVertical: 25}}>Reinforcements</Text>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex:1.5}}>
                <Image
                    style={{flex:1, alignItems: 'center', width: null, height: null}}
                    resizeMode='stretch'
                    opacity={0.30}
                    source={Icons[player1.icon.toLowerCase()]} >
                    <Text style={{flex: 1, marginTop: 20, fontSize: 28, fontWeight: 'bold'}}>{this.state.player1}</Text>
                </Image>
            </View>
            <View style={{flex: 1, marginRight: 5}}>
                <DiceRoll dice={this.player1dice} values={[this.state.die1,this.state.die2]}
                    onRoll={this.onDiceRollPlayer1} onDie={this.onDieChangedPlayer1}/>
            </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex:1.5}}>
                <Image
                    style={{flex:1, alignItems: 'center', width: null, height: null}}
                    resizeMode='stretch'
                    opacity={0.30}
                    source={Icons[player2.icon.toLowerCase()]} >
                    <Text style={{flex: 1, marginTop: 20, fontSize: 28, fontWeight: 'bold'}}>{this.state.player2}</Text>
                </Image>
            </View>
            <View style={{flex: 1, marginRight: 5}}>
                <DiceRoll dice={this.player2dice} values={[this.state.die3,this.state.die4]}
                    onRoll={this.onDiceRollPlayer2} onDie={this.onDieChangedPlayer2}/>
            </View>
        </View>
    </View>
</View>
*/

module.exports = AdminReinforcementsView;
