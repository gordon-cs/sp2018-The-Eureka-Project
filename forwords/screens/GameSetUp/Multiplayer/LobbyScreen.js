import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Image, TouchableOpacity } from "react-native";


export default class LobbyScreenRoom extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }
    startGameOnPress() {
        const { navigate } = this.props.navigation;
        var groupID = this.props.navigation.state.params.groupID;
        var playerType = this.props.navigation.state.params.playerType;
        var isSinglePlayer = this.props.navigation.state.params.isSinglePlayer;
        var lesson = this.props.navigation.state.params.lesson;
        // Request to send to the server - must be stringified.
        var stringifiedRequest = JSON.stringify(
            [{
                'request': 'startGame',
                'lesson': '' + lesson + ''
            }]
        );
        global.ws.send(stringifiedRequest);
        global.ws.onmessage = e => {
            console.log('LobbyScreen:Received message:', e.data)
        }
        console.log("LobbyScreen: props: isSinglePlayer: ", isSinglePlayer);
        console.log("                    playerType: ", playerType);
        console.log("                    groupID: ", groupID);
        console.log("                    lesson: ", lesson);
        console.log(' ');
        navigate('GamePlay', { groupID: groupID, playerType: playerType, lesson: lesson, isSinglePlayer: isSinglePlayer });
    };

    render() {
        const { navigate } = this.props.navigation;
        const playerType = this.props.navigation.state.params.playerType; // host or member
        const isSinglePlayer = this.props.navigation.state.params.isSinglePlayer;
        var groupID = this.props.navigation.state.params.groupID;
        let content;
        // If the user is a HOST (playing with others)
        if (!isSinglePlayer && playerType == 'host') {
            content = (
                <View style={styles.headingView}>
                    <Text style={styles.headingText}> You are the host of Group {groupID}</Text>
                    <Text style={styles.subheadingText}> Click Play when everyone is ready to go!</Text>
                    <Image
                        style={styles.singlePlayerImage}
                        source={require("../../../assets/images/person.png")}
                    />


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.startGameOnPress()}
                    >
                        <Text style={styles.buttonText}>Start Game</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        // If the user is a member (not the game creator, just someone who joined)
        else if (playerType == 'member') {
            // show list of players who are waiting in the room 
            // let host enter the room with the same GroupID
            // then host clicks play when eveyone is ready 
            content = (
                <View style={styles.headingView}>
                    <Text style={styles.headingText}> You are a member of Group {groupID}</Text>
                    <Text style={styles.subheadingText}> Waiting for the host to start the game
                    once everyone is in!</Text>
                    <Image
                        style={styles.singlePlayerImage}
                        source={require("../../../assets/images/person.png")}
                    />
                </View>
            );
        }
        return (
            <View style={styles.MainContainer}>
                {content}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: '#fff'
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 30,
        color: 'black',
    },
    headingView: {
        alignItems: "center",
    },
    mainText: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 25,
        color: 'black',
        fontWeight: "bold",
    },
    headingText: {
        fontWeight: "bold",
        fontSize: 30,
        color: 'black',
    },
    subheadingText: {
        alignItems: 'center',
        margin: 10,
        fontSize: 20,
        color: 'black',
    },
    singlePlayerImage: {
        width: 30,
        height: 55,
        flex: 1,
        resizeMode: 'contain',
    },
    button: {
        justifyContent: "center",
        flexDirection: "column",
        margin: 10,
        width: 120,
        height: 120,
        borderRadius: 80,
        backgroundColor: "#5b3b89"
    },
    buttonText: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "white"
    },
});

