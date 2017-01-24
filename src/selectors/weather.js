import { createSelector } from 'reselect';
import getBattle from './game';

export default createSelector(
    [getBattle],
    (battle) => {        
        return battle.weather;
    }    
);