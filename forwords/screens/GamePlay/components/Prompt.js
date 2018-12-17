import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Button,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promptID: this.props,
            imageURL: this.props,
            // promptObj: thi
        };
    }
    render() {
        const promptText = this.props.promptObj;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.promptText}>
                    {promptText}
                </Text>
            </View>
            // <Image style={StyleSheet.promptImage}>
            //     {this.props.promptImage}
            // </Image>
        );
    }
}

const styles = StyleSheet.create({
    promptImage: {
        width: 100,
        height: 100,
    },
    mainContainer: {
        justifyContent: "center",
        flex: 1,
        margin: 10,
        // paddingTop: Platform.OS === "ios" ? 20 : 0,
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