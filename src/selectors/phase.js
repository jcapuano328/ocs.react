import { createSelector } from 'reselect';
import Phases from '../services/phases';
import getPlayers from './players';

const getPhase = (state) => Phases.get(state.current.phase);
const getPlayer = (state) => state.current.player;

export default createSelector(
    [getPhase,getPlayer,getPlayers],
    (phase,player,players) => {        
		if (phase.indexOf('{a}') > -1) {
			phase = phase.replace('{a}', player == players[0].player ? players[0].name : players[1].name);
		} else if (phase.indexOf('{r}') > -1) {
			phase = phase.replace('{r}', player == players[0].player ? players[1].name : players[0].name);
		}		
		return phase;        
    }    
);
