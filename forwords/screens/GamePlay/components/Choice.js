import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    View
} from "react-native";

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
        if (answeredCorrectly == '0') {
            var backgroundColor = {
                backgroundColor: "white",
            };
        } else if (answeredCorrectly == '1') {
            backgroundColor = {
                backgroundColor: "green",
            };
        } else if (answeredCorrectly == '2') {
            backgroundColor = {
                backgroundColor: "red",
            };
        }

        return (
            <View style={[styles.mainContainer, backgroundColor]}>
                <TouchableOpacity
                    style={styles.mainContainer}
                    onPress={() => {
                        this.handleAttempt(choiceID, promptID);
                    }}
                >
                    <Text style={[styles.choiceText, backgroundColor]}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        flex: 1,
        margin: 10,
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        width: 120,
        height: 100,
        borderRadius: 80,
    },
    choiceText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
});
