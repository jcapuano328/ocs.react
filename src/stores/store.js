import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: {
            battle: int,
            turn: int,
            phase: int,
            weather: string,
            initiative: string,
            player: string,
            player1: {
                supply: string,
                reinforcements: string
            },
            player2:{
                supply: string,
                reinforcements: string
            }
        }        
    }
*/
const store = Store(rootReducer);

export default store;