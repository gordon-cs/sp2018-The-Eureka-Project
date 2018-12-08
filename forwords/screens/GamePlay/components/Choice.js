import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
} from 'react-native';

export default class Choice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props,
            promptID: this.props.promptID,
            choiceID: this.props.choiceID,
            correctAnswer: Boolean,
        };
        this.handleAttempt = this.handleAttempt.bind(this);
    }

    handleAttempt() {
        if (this.state.promptID === this.state.choiceID) {
            this.setState({ correctAnswer: true });
        } else {
            this.setState({ correctAnswer: false }); 
        }
    }

    render() {
        // const backgroundColor = this.state.correctAnswer ? 'green' : 'red';
        return (
            <TouchableOpacity style={styles.mainContainer}
                onPress={this.handleAttempt}>
                <Text style={styles.choiceText}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
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
        backgroundColor: "white",
    },
    choiceText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
});