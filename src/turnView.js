'use strict'

var React = require('react');
import { View, Text, Image, TouchableOpacity } from 'react-native';
var SpinSelect = require('./widgets/spinSelect');
var icons = require('./res/icons');
var Current = require('./services/current');
var Player = require('./services/player');
var log = require('./services/log');

var TurnView = React.createClass({
    getInitialState() {
        let state = {
            turn: Current.turn(),
            phase: Current.phase(),
            player: Current.player()
        };
        return state;
    },
    componentDidMount() {
        this.props.events.addListener('reset', this.onReset);
        this.props.events.addListener('initiativechange', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        this.setState({turn: Current.turn(), phase: Current.phase(), player: Current.player()});
    },
    onPrevTurn() {
        Current.prevTurn(true)
        .then((turn) => {
            this.setState({turn: turn, player: Current.player()});
        })
        .done();
    },
    onNextTurn() {
        Current.nextTurn(true)
        .then((turn) => {
            this.setState({turn: turn, player: Current.player()});
        })
        .done();
    },
    onPrevPhase() {
        Current.prevPhase(true)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase, player: Current.player()});
        })
        .done();
    },
    onNextPhase() {
        Current.nextPhase(true)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase, player: Current.player()});
        })
        .done();
    },
    onNextPlayer() {
        Current.nextPlayer()
        .then((player) => {
            this.setState({player: player, phase: Current.phase()});
        })
        .done();
    },
    render() {
        let player = Player.get(this.state.player);
        return (
          <View style={{flexDirection: 'row', height: 90, marginTop: 60, marginLeft: 10, marginRight: 10}}>
            <View style={{flex: 1}}>
                <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={this.props.logo}/>
            </View>
            <View style={{flex: 4}}>
                <SpinSelect value={this.state.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                <SpinSelect value={this.state.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.onNextPlayer} >
                    <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={icons[player.icon.toLowerCase()]}/>
                </TouchableOpacity>
            </View>
          </View>
        );
    }
});

module.exports = TurnView;
