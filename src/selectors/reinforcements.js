import { createSelector } from 'reselect';
import getBattle from './game';

export default createSelector(
    [getBattle],
    (battle) => {        
        let players = battle.players.map((p) => { return {player: p.player, name: p.name, icon: p.icon, reinforcements: p.reinforcements}; });

        return {
            player1: players.find((p) => p.player == 'player1'),
            player2: players.find((p) => p.player == 'player2')
        };
    }    
);