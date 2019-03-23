import React, { Component } from "react";
import { Button, StyleSheet, Text, View, } from "react-native";
var playerNum = [];

export default class WaitingRoom extends Component {
    static navigationOptions = {
      header: null,
    };
    constructor(props) {
        super(props);

        this.state = {
            lessonList: [],
            groupID: '',
            isWaiting: true
        };
    }
    playOnPress() {
        const {navigate} = this.props.navigation;
        var ws = this.props.navigation.state.params.ws;
        var newMessage = 'waiting' + this.props.navigation.state.params.groupID;
        ws.send(newMessage);
        ws.onmessage = e => {
            console.log('WaitingRoomScreen:Received message:', e.data)
        }
      
        navigate('gameplay', {ws:ws, groupID: this.props.navigation.state.params.groupID, playerType: 'member' && 'host'});
        };

    render() {
        const {navigate} = this.props.navigation;
        let content;
        //let playerNum = this.props.navigation.state.params.playerType;
        
        if(this.props.navigation.state.params.playerType =='member'){ 
            let playerNum = this.props.navigation.state.params.playerType;
            var ws = this. props.navigation.state.params.ws;
            var newMessage = this.props.navigation.state.params.playerType;
            ws.send(newMessage);
            ws.onmessage = e => {
                console.log('WaitingRoom:Received message:', e.data)
            }  
            content =  (
            // show list of players who are waiting in the room 
            // let host enter to the room with the same GroupID
            // then host clicks play when eveyone is ready 
            <View style= {styles.headingView}>
                <Text style= {styles.headingText}> Waiting for others to join</Text>
                <Text style={styles.icon}>👤👤👤👤</Text>
                <Text style = {styles.headingText}>You are Player: {playerNum}</Text>
                <View style={{ flex: 1, paddingTop: 20 }}></View>
            </View>
            );
        }
    
        else if(this.props.navigation.state.params.playerType =='host'){
            content = (
                <View style= {styles.headingView}>
                <Text style= {styles.headingText}> You are the HOST</Text>
                <Text style= {styles.headingText}> click Play when everyone is waiting</Text>
                <Text style={styles.icon}>👤👤👤👤</Text>
                <View style={{ flex: 1, paddingTop: 20 }}></View>
            
            <Button style={styles.button}
            title = 'Play'
            onPress = {() => this.playOnPress()}
            color = 'green'
            />
        </View>
            );
        }

    return (<View>{content}</View>)
    }
}

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
    icon: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        fontSize: 80
    }
 });

 