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
        };

    }
    render() {
        return (
            <Image style={StyleSheet.promptImage}>
                {this.props.promptImage}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    promptImage: {
        width: 100,
        height: 100,
    }
});