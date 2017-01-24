import React from 'react';
import { Router } from 'react-native-router-flux';
import routes, {MenuItems} from './routes';
import NavDrawer from './views/navDrawer';
import { Provider } from 'react-redux';
import store from './stores/store';

let App = React.createClass({    
    render () {      
        return (            
            <Provider store={store}>
                <NavDrawer>
                    <Router style={{flex:1}} scenes={routes} />
                </NavDrawer>                
            </Provider>            
        );
    }
});

module.exports = App;
