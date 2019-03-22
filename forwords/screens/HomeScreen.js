import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  onSignOutPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate('Login');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
            <Image source={require('../assets/images/person.png')} />
          </View>
          <Button style={styles.button}
            title='Single Player Mode!'
            onPress={() => navigate('SinglePlayerModeSelection')}
            color='purple'
          />

          <View style={styles.headingView}>
            <Image source={require('../assets/images/people.png')} />
          </View>
          <Button style={styles.button}
            title='Multiplayer Mode!'
            onPress={() => navigate('SinglePlayerModeSelection')}
            color='purple'
          />

          <Button style={styles.button}
            title='Sign Out'
            onPress={() => this.onSignOutPress()}
            color='purple'
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 80,
  },
  headingView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  button: {
    alignItems: 'center',
    color: '#800080',
    borderRadius: 50,
    width: 160,
  },
});
