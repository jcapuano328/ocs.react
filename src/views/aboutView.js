import React from 'react';
import { connect } from 'react-redux';
import {About} from 'react-native-nub';
import {logo} from '../res';

const AboutView = (props) => {
    return (
        <About logo={logo}
            title={'About OCS Assistant'}
            version={props.version}
            releasedate={props.releasedate}
            description={'An assistant for the Operational Combat Series games from Multi-Man Publishing.'}
            dependencies={[
                {description: 'react-redux', url: 'https://github.com/reactjs/react-redux'},
                {description: 'react-native-router-flux', url: 'https://github.com/aksonov/react-native-router-flux'},
                {description: 'react-native-drawer', url: 'https://github.com/root-two/react-native-drawer'},
                {description: 'react-native-scrollable-tab-view', url: ''},
                {description: 'react-native-audioplayer', url: ''},
                {description: 'react-native-fs', url: ''},
                {description: 'react-native-menu', url: ''},
                {description: 'moment', url: ''}                
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    version: state.info.version,
    releasedate: state.info.releasedate
});

module.exports = connect(
  mapStateToProps
)(AboutView);
