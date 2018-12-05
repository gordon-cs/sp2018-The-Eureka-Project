import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, FlatList, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';

export default class GamePlayScreen extends Component {
    static navigationOptions = {
        header: null,
      };
      constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          lessonList: [],
        };

    }


    async componentWillMount() {
        console.log("GamePlayScreen: Got into componentDidMount")
    }

    render () {
        return (
            <View>


                
            </View>
        )
    }


}


const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      margin: 10,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    }
});