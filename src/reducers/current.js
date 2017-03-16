import {REHYDRATE} from 'react-native-nub';
import types from '../constants/actionTypes';

const defaultState =  {
    battle: -1,
    turn: 1,
    phase: 0,
    weather: '',
    initiative: '',
    player: '',
    player1: {
        supply: '',
        reinforcements: ''
    },
    player2:{
        supply: '',
        reinforcements: ''
    }
};


const prevTurn = (t) => {    
    if (--t < 1) { t = 1; }
    return t;    
}
const nextTurn = (t,m) => {    
    if (++t > m) { t = m; }
    return t;    
}

const nextPlayer = (p,l) => {
    return p == l[0] ? l[1] : l[0];
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:        
        if (action.payload.current) {
            return {
                ...state,
                ...action.payload.current
            };        	
        }
        return {...state};
        
    case types.SET_CURRENT:
        return {
            ...action.value
        };

    case types.PREV_TURN:        
        return {
            ...state,
            turn: prevTurn(state.turn)
        };

    case types.NEXT_TURN:
        return {
            ...state,
            turn: nextTurn(state.turn, action.value)
        };
    
    case types.PREV_PHASE:
        let phase = state.phase - 1;
        let player = state.player;
        let turn = state.turn;
		if (phase < 0) {
			phase = action.value.maxphases - 1;
            if (state.initiative == player) {
				turn = prevTurn(state.turn);
			}            
            player = nextPlayer(player, action.value.players);
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };           

    case types.NEXT_PHASE:
        phase = state.phase + 1;
        player = state.player;
        turn = state.turn;
		if (phase >= action.value.maxphases) {
			phase =  0;
			if (state.initiative != player) {
				turn = nextTurn(turn, action.value.maxturns);
			}
            player = nextPlayer(player, action.value.players);
		}
        return {
            ...state,
            turn: turn,
            phase: phase,
            player: player
        };
        
    case types.NEXT_PLAYER:
        return {
            ...state,
            player: nextPlayer(state.player, action.value)
        };

    case types.SET_PLAYER:
        return {
            ...state,
            player: action.value
        };

    case types.NEXT_INITIATIVE:
        let init = state.initiative;
		if (init == 'player1') {
			init = 'player2';
		} else {
			init = 'player1';
		}

        return {
            ...state,
            initiative: init,
            player: init
        };

    case types.SET_INITIATIVE:
        return {
            ...state,
            initiative: action.value
        };

    case types.SET_WEATHER:
        return {
            ...state,
            weather: action.value
        };
    
    case types.SET_SUPPLY:    
        return {
            ...state,
            [action.value.player]: {
                ...state[action.value.player],
                supply: action.value.value
            }            
        };

    case types.SET_REINFORCEMENTS:    
        return {
            ...state,
            [action.value.player]: {
                ...state[action.value.player],
                reinforcements: action.value.value
            }            
        };

    default:
        return state;
    }
}
