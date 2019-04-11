import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promptID: this.props,
            imageURL: this.props,
        };
    }
    render() {
        const promptText = this.props.promptObj.pinyin;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.promptText}>
                    {promptText}
                </Text>
            </View>
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
        backgroundColor: "white"
    },
    promptText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});