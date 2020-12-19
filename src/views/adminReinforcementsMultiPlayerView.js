import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import Icons from '../res';
import Reinforcements from '../services/reinforcements';
import getReinforcements from '../selectors/reinforcements';
import {setReinforcements} from '../actions/current';
import inRange from '../services/inrange';

var AdminReinforcementsSingleView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, color: 'white', dotcolor: 'black'}
    ],
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (/*this.state.width != e.nativeEvent.layout.width ||*/
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },            
    onDiceRoll(d) {
        this.resolve(d[0].value, d[1].value);
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.resolve(this.state.die1, this.state.die2);
    },
    resolve(die1, die2) {
        this.setState({die1: die1, die2: die2});        

        let playerreinforcements = this.getPlayerReinforcements(this.props.playerreinforcements, this.props.turn);
        let reinforcements = Reinforcements.find(this.props.turn, {reinforcements: playerreinforcements}, die1, die2);        
        
        let current = this.props[this.props.player] || {};

        let currentreinforcements = {
            ...current,
            [this.props.playerreinforcements.icon]: reinforcements
        };                

        this.props.setReinforcements(this.props.player, currentreinforcements);
    },
    render() {
        let playerreinforcements = this.props.playerreinforcements;
        let currentplayerreinforcements = this.props[this.props.player];
        let iconwidth = this.state.width * 0.45;// || */Style.Scaling.scale(96);
        let iconheight = this.state.height * 0.45;// || */Style.Scaling.scale(88);

        return (            
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 4}}>
                <View style={{flex: 5, justifyContent:'flex-start', alignItems:'center'}} onLayout={this.onLayout}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <Image
                                style={{width: iconwidth, height: iconheight, resizeMode: 'contain'}}
                                source={Icons[playerreinforcements.icon.toLowerCase()]} />
                        </View>
                        <View style={{flex: 3, alignItems: 'center'}}>
                            <Text style={{marginLeft: 10, fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{currentplayerreinforcements[playerreinforcements.icon]}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2, marginRight: 5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                        onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    <View style={{flex:1}} />
                </View>
            </View>                
        );
    },    
    getPlayerReinforcements(player, turn) {
        if (player.reinforcements && player.reinforcements.length > 0) {
            if ('turnStart' in player.reinforcements[0]) {
                return (player.reinforcements.find((r) => inRange(turn, r.turnStart, r.turnEnd)) || {effects:[]}).effects;
            }
            return player.reinforcements;
        }
        return [];
    }
});

const mapStateToProps = (state) => ({    
    turn: state.current.turn,
    player: state.current.player,
    player1: state.current.player1.reinforcements,
    player2: state.current.player2.reinforcements
});

const mapDispatchToProps = ({setReinforcements});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminReinforcementsSingleView);