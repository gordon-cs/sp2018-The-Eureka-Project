import React, { Component } from "react";
import { Button, StyleSheet, Text, View, } from "react-native";


export default class WaitingRoom extends Component {
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
    playOnPress() {
        const {navigate} = this.props.navigation;
        let playerType = ('member' || 'host');
        navigate('gameplay') 
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
        <View>
            <Text style= {styles.container}>
                Waiting for others to join
            </Text>
            <Button style={styles.button}
            title = 'Play'
            onPress = {() => this.playOnPress()}
            color = 'green'
            />
        </View>
        );
        /*if(this.state.isWaiting) {
            return (
                <view style = {styles.headingView}>
                //add the players to the waiting list 
                </view>
                
            );
        }*/
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

 