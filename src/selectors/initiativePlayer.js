import { createSelector } from 'reselect';
import getPlayers from './players';
const getInitiative = (state) => state.current.initiative;

export default createSelector(
    [getInitiative,getPlayers],
    (player, players) => {        
        return players.find((p) => p.player == player);
    }    
);