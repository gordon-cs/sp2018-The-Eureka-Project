import React, { Component } from "react";
import TimerCountdown from 'react-native-timer-countdown';
import {
    View,
} from "react-native";

export default class Timer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
            <TimerCountdown
                initialSecondsRemaining={1000 * 5}
                onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                onTimeElapsed={() => console.log('complete')}
                allowFontScaling={true}
                style={{ fontSize: 20, color: 'black'}}
            />
            </View>
        );
    }
}
