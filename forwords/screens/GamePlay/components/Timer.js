import React, { Component } from "react";
import CountdownCircle from 'react-native-countdown-circle';
import {
    View,
} from "react-native";

export default class Timer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const reset = this.props.resetTimer;
        let seconds;
        if (reset) {
            seconds = 8;
        }
        return (
            <View>
                <CountdownCircle
                    seconds={seconds}
                    radius={30}
                    borderWidth={8}
                    color="#ff003f"
                    bgColor="#fff"
                    textStyle={{ fontSize: 20 }}
                    onTimeElapsed={() => console.log('Elapsed!')}
                />
            </View>
        );
    }
}
