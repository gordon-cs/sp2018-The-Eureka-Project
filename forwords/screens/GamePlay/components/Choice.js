import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, } from "react-native";

export default class Choice extends Component {
    constructor(props) {
        super(props);
        this.handleAttempt = this.handleAttempt.bind(this);
    }

    handleAttempt(answer, prompt) {
        this.props.wasAnsweredCorrectly(answer, prompt);
    }

    render() {
        const text = this.props.text;
        const choiceID = this.props.choiceID;
        const promptID = this.props.promptID;
        const answeredCorrectly = this.props.answeredCorrectly;
        if (answeredCorrectly[1] == 0) {
            var backgroundColor = {
                backgroundColor: "white",
            };
        }

        // if it is my choiceID
        if (answeredCorrectly[0] == choiceID) {
            // if i got it correct
            if (answeredCorrectly[1] == 1) {
                backgroundColor = {
                    backgroundColor: "#5cbf4a",
                };
                // if i got it incorrect
            } else if (answeredCorrectly[1] == 2) {
                backgroundColor = {
                    backgroundColor: "red",
                };
            }
            // it is NOT my choiceID
        } else {
            backgroundColor = {
                backgroundColor: "white",
            };
        }
        return (
            <TouchableOpacity
                style={[styles.mainContainer, backgroundColor]}
                onPress={() => {
                    this.handleAttempt(choiceID, promptID);
                }}
            >
                <Text style={styles.choiceText}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        flex: 1,
        margin: 10,
        width: 120,
        height: 100,
        borderRadius: 80,
    },
    choiceText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});
