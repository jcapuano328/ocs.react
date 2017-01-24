import { createSelector } from 'reselect';
import Battles from '../services/battles';

const getBattle = (state) => state.current.battle;

export default createSelector(
    [getBattle],
    (battleid) => {        
        return Battles.get(battleid);
    }    
);