import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Style} from 'react-native-nub';

/*
    {strength: '', results: ''}
*/


var BarrageResultsView = React.createClass({
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
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),backgroundColor: 'silver', textAlign: 'center'}}>Strength</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(),backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                    </View>                    
                </View>
                <View style={{flex:1}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.results.map((res,i) => {
                            let match = (res.strength == this.props.strength);
                            let text = match ? 'white' : 'black';                            
                            let background = match ? 'goldenrod' : 'transparent';                            
                            if (match) {
                                this.state.selected = i;
                            }

                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row', backgroundColor: background}}>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:text}}>{res.strength}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.smallmedium(),textAlign: 'center', color:text}}>{res.results}</Text>
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

module.exports = BarrageResultsView;
