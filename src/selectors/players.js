import { createSelector } from 'reselect';
import getBattle from './game';

export default createSelector(
    [getBattle],
    (battle) => {                
        let players = battle.players.map((p) => { return {player: p.player, name: p.name, icon: p.icon}; });

        return [
            players.find((p) => p.player == 'player1'),
            players.find((p) => p.player == 'player2')
        ];        
    }    
);