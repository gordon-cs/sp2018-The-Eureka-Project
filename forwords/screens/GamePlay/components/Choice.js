import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Button,
} from 'react-native';

export default class Choice extends Component {
constructor(props) {
    super(props);

    this.state= {
        title: this.props
    };
}



    render() {
        return (
            <View >
                <Text>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

