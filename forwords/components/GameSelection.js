import React from 'react';
import { Icon } from 'expo';
import { Button, StyleSheet, Text, View, Typography, Platform, } from "react-native";
import Colors from '../constants/Colors';

export default class GameSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            lessonList: []
        };
    }
    async componentWillMount() {
        try {
            axios
                .get(fullRoutePrefix + "/lesson-list")
                .then(res => {
                    const lessons = res.data;
                    this.setState({
                        isLoading: false,
                        lessonList: lessons
                    });
                });
        } catch (err) {
            throw new Error("/lesson-list did not work");
        }
    }

    render() {
        const titles = this.state.lessonList;
        const buttons = titles.map(element => (
            <Button
                key={element.Number}
                style={styles.button}
                title={'Lesson ' + element.Number + ': ' + element.Title}
                onPress={() => navigate("Instruction", { lesson: element.Number })}
            />
        ));
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Hello</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text>Hello</Text>
                    {buttons}
                </View>
            );
        }
    }
}