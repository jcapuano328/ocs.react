import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Style} from 'react-native-nub';

var GroundResultsView = React.createClass({
    getInitialState() {
        return {
            selected: 0
        };
    },
    componentDidUpdate() {
        this._scrollView.scrollTo({x:0, y: this.state.selected * 18, animated: true});
    },
    render() {        
        this.state.selected = 0;        
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Open</Text>
                    </View>                    
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Close</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>V Close</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Ext Close</Text>
                    </View>                    
                </View>
                <View style={{flex:1}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.results.map((res,i) => {
                            let match = (res.odds == this.props.odds);                            
                            let text = match ? 'white' : 'black';                            
                            let background = match ? 'goldenrod' : 'transparent';                            
                            let opentext = match && (this.props.terrain == 'open') ? 'white' : 'black';
                            let openbgd = match && (this.props.terrain == 'open') ? 'goldenrod' : 'transparent';
                            let closetext = match && (this.props.terrain == 'close') ? 'white' : 'black';
                            let closebgd = match && (this.props.terrain == 'close') ? 'goldenrod' : 'transparent';
                            let vclosetext = match && (this.props.terrain == 'veryclose') ? 'white' : 'black';
                            let vclosebgd = match && (this.props.terrain == 'veryclose') ? 'goldenrod' : 'transparent';
                            let exclosetext = match && (this.props.terrain == 'extremelyclose') ? 'white' : 'black';
                            let exclosebgd = match && (this.props.terrain == 'extremelyclose') ? 'goldenrod' : 'transparent';
                            if (match) {
                                this.state.selected = i;
                            }

                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:text, backgroundColor: background}}>{res.odds}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:opentext, backgroundColor: openbgd}}>{res.open}</Text>
                                    </View>                                                                                                            
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:closetext, backgroundColor: closebgd}}>{res.close}</Text>
                                    </View>                                                                        
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:vclosetext, backgroundColor: vclosebgd}}>{res.veryclose}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:exclosetext, backgroundColor: exclosebgd}}>{res.extremelyclose}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>                
            </View>            
        );
    }    
});

module.exports = GroundResultsView;
