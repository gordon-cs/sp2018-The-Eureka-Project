import React, { Component } from "react";
import { Button, StyleSheet, Text, View, } from 'react-native';

export default class WaitingScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            lessonList: [],
            groupCode: '',
            isWaiting: {},

        };
    }

    render() {
        const {navigate} = this.props.navigaion;
        
        <View>
            <Text style= {StyleSheet.container}>
                Waiting for others to join
            </Text>
            <Button style={StyleSheet.button}
            title = 'Play'
            onPress = {() => navigate('GamePlay', {lesson:lesson})}
            color = 'green'
            />
        </View>
        if(this.state.isWaiting) {
            return (
                <view style = {styles.headingView}>
                //add the players to the waiting list 
                </view>
            );
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headingText: {
        marginTop: 30,
        marginBottom: 50,
        marginLeft: 50,
        fontSize: 50,
        color: 'purple',
    },
    button: {
        alignItems: 'center',
        color: '#800080',
        borderRadius: 50,
        width: 160,
    },
 });