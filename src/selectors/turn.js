import { createSelector } from 'reselect';
import moment from 'moment';
import getGame from './game';

const getTurn = (state) => state.current.turn;
const turnIndex = (b,d) => {	
	let day = d.date();
    let idx = b.turnTable.findIndex((t) => day == t);
    return idx > -1 ? idx : 0;
}

export default createSelector(
    [getTurn, getGame],
    (curturn, game) => {
        if (!game || !game.startDate) {
            return '';
        }

		let d = moment(game.startDate);
		let lastday = moment(d).endOf('month').date();
		let turn = turnIndex(game,d);
		for (let i = 1; i<curturn; i++) {
			turn++;
			if (turn >= game.turnTable.length || game.turnTable[turn] > lastday) {
				turn = 0;
				d.add(1, 'months');
				lastday = moment(d).endOf('month').date();
			}
		}
		return moment({year: d.year(), month: d.month(), day: game.turnTable[turn]}).format("MMM DD, YYYY");
    }    
);
