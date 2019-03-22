import React from 'react';
import { Button, StyleSheet, Text, View, Platform, TouchableOpacity, } from 'react-native';

export default class InstructionScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        const { lesson } = this.props.navigation.state.params;
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.headingText}>
                    How To Play
                </Text>
                <Text style={styles.bulletText}>
                    1.  Read the prompt at the top
                </Text>
                <Text style={styles.bulletText}>
                    2.  Select the correct answer from the choices at the bottom
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate('GamePlay', { lesson: lesson })}>
                        <Text style={styles.continueText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: '#fff'
    },
    headingText: {
        marginTop: 30,
        marginBottom: 50,
        marginLeft: 50,
        fontSize: 50,
        color: 'black',
        fontWeight: "bold",
    },
    bulletText: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        fontSize: 25,
        color: '#5b3b89',
    },
    button: {
        justifyContent: "center",
        flexDirection: 'column',
        margin: 10,
        width: 120,
        height: 120,
        borderRadius: 80,
        backgroundColor: "#5b3b89"
    },
    buttonContainer: {
        alignItems: "center",
        flex: 1,
        borderRadius: 80,
        margin: 10,

    },
    continueText: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: 'white',
    },
});