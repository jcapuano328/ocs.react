import types from '../constants/actionTypes';
import {toast} from './toast';
import Phases from '../services/phases';
import getGame from '../selectors/game';
import getPlayers from '../selectors/players';

export const reset = (e) => (dispatch,getState) => {
    const {current} = getState();
    const game = getGame(getState());
    e = e || {id: current.battle, players: game.players};    
    let data = {
        battle: e.id,
        turn: 1,
        phase: 0,
        weather: '',
        initiative: e.players[0].player,
        player: e.players[0].player,
        player1: {supply: '', reinforcements: ''},
        player2: {supply: '', reinforcements: ''}
    };
    
    dispatch({type: types.SET_CURRENT, value: data});
}

export const prevTurn = () => (dispatch) => {    
    dispatch({type: types.PREV_TURN});
}
export const nextTurn = () => (dispatch,getState) => {    
    const game = getGame(getState());
    dispatch({type: types.NEXT_TURN, value: game.turns});
}

export const prevPhase = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const players = getPlayers(getState()).map((p) => p.player);
    dispatch({type: types.PREV_PHASE, value: {maxphases: Phases.count, players: players}});
}
export const nextPhase = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const players = getPlayers(getState()).map((p) => p.player);
    dispatch({type: types.NEXT_PHASE, value: {maxphases: Phases.count, maxturns: game.turns, players: players}});
}

export const nextPlayer = () => (dispatch,getState) => {    
    const game = getGame(getState());
    const players = getPlayers(getState()).map((p) => p.player);
    dispatch({type: types.NEXT_PLAYER, value: players});
}

export const setPlayer = (v) => (dispatch) => {    
    dispatch({type: types.SET_PLAYER, value: v});
}

export const nextInitiative = () => (dispatch) => {    
    dispatch({type: types.NEXT_INITIATIVE});
}

export const setInitiative = (v) => (dispatch) => {    
    dispatch({type: types.SET_INITIATIVE, value: v});
}

export const setWeather = (v) => (dispatch) => {    
    dispatch({type: types.SET_WEATHER, value: v});
}

export const setSupply = (player,v) => (dispatch) => {    
    dispatch({type: types.SET_SUPPLY, value: {player: player, value: v}});
}

export const setReinforcements = (player,v) => (dispatch) => {    
    dispatch({type: types.SET_REINFORCEMENTS, value: {player: player, value: v}});
}
