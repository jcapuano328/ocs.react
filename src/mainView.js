'use strict';

var React = require('react');
import { View, Text, Navigator } from 'react-native';
import {DrawerLayout, NavMenu, NavMenuItem, TitleBar, LandingView, AboutView, Log} from 'react-native-app-nub';
var BattleNavMenuItem = require('./widgets/battleNavMenuItem');
import { MenuContext } from 'react-native-menu';
var Icons = require('./res/icons');
var EventEmitter = require('EventEmitter');
var BattleView = require('./battleView');
var log = Log;
var Battles = require('./services/battles');
var Current = require('./services/current');

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            routes: {
                landing: {index: 0, name: 'landing', title: 'Welcome', subtitle: 'Select a battle', onMenu: this.navMenuHandler},
                battle: {index: 1, name: 'battle', title: 'Battle', onMenu: this.navMenuHandler, onRefresh: this.onReset, onInfo: this.onAbout},
                about: {index: 7, name: 'about', title: 'About'}
            },
            version: '1.2.0'
        };
    },
    fetchBattle() {
        Current.load()
        //new Promise((a,r)=> a())
        .then((data) => {
            if (data) {
                this.state.routes.battle.data = Battles.get(data.battle);
                log.debug('current battle ' + this.state.routes.battle.data.name);
                this.refs.navigator.resetTo(this.state.routes.battle);
            } else {
                log.debug('mainView: no current game');
            }
        })
        .done();
    },
    componentWillMount() {
        this.eventEmitter = new EventEmitter();
        this.state.initialRoute = this.state.routes.landing;
        this.fetchBattle();
    },
    componentWillUnmount() {
    },
    toggleDrawer() {
        if (!this.state.drawer) {
            let open = this.refs.drawer.openDrawer || this.refs.drawer.open;
            open();
        } else {
            let close = this.refs.drawer.closeDrawer || this.refs.drawer.close;
            close();
        }
        this.state.drawer = !this.state.drawer;
    },
    menuHandler() {
        this.toggleDrawer();
    },
    navMenuHandler(e, id) {
        //log.debug(e);
        if (e == 'About') {
            this.refs.navigator.push(this.state.routes.about);
        }
        else if (e == 'battle') {
            this.state.routes.battle.data = Battles.get(id);
            Current.reset(this.state.routes.battle.data)
            .then(() => {
                this.eventEmitter.emit('reset');
                this.refs.navigator.resetTo(this.state.routes.battle);
            });
        }
        this.toggleDrawer();
    },
    onChangeRoute(route, data) {
        if (this.state.routes[route]) {
            this.state.routes[route].data = data;
            this.refs.navigator.push(this.state.routes[route]);
        }
    },
    onReset() {
        log.debug('reset game');
        this.eventEmitter.emit('menureset');
    },
    onAbout() {
        this.refs.navigator.push(this.state.routes.about);
    },    
    renderScene(route, navigator) {
        route = route || {};
        log.debug('render scene ' + route.name);
        if (route.name == 'battle') {
            this.state.routes.battle.title = route.data.name;
            this.state.routes.battle.subtitle = route.data.desc;
            return (
                <BattleView battle={route.data} events={this.eventEmitter} />
            );
        }

        if (route.name == 'about') {
            return (
                <AboutView logo={Icons.logo}
                    title={'About OCS Assistant'}
                    version={this.state.version}
                    releasedate={'October 7, 2016'}
                    description={'An assistant for the Operational Combat Series games from MultiMan Publishing.'}
                    dependencies={[
                        {description: 'react-native-scrollable-tab-view', url: ''},
                        {description: 'react-native-audioplayer', url: ''},
                        {description: 'react-native-fs', url: ''},
                        {description: 'react-native-menu', url: ''},
                        {description: 'moment', url: ''}
                    ]}
                    events={this.eventEmitter} onClose={() => {navigator.pop();}}
                />
            );
        }

        return (
            <LandingView top={30} splash={Icons.splash} events={this.eventEmitter} />
        );
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <DrawerLayout
                    ref="drawer"
                    onDrawerClosed={() => {this.state.drawer = false;} }
                    onDrawerOpened={() => {this.state.drawer = true;} }
                    onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
                    onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
                    drawerWidth={300}
                    renderNavigationView={() => <NavMenu items={Battles.battles.map((b,i) =>
                            <BattleNavMenuItem key={i+1} id={b.id} name={b.name} desc={b.desc} image={b.image} onPress={this.navMenuHandler} />
                        )} />
                    }>
                    <MenuContext style={{flex: 1}}>
                        <Navigator
                            ref="navigator"
                            debugOverlay={false}
                            initialRoute={this.state.initialRoute}
                            renderScene={this.renderScene}
                            navigationBar={<Navigator.NavigationBar style={{backgroundColor: 'forestgreen'}} routeMapper={TitleBar({menu: Icons.menu, refresh: Icons.refresh, info: Icons.info, textcolor:'white'})} />}
                        />
                    </MenuContext>
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
