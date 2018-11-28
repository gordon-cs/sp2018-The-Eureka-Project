import React, {Component} from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Image,
  Platform,
  Form,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Container,
  TextInput,
  Item,
  Label,
  Input} from 'react-native'; // There are some unecessary imports, but they were made just to be safe
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
 
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
   <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.getStartedContainer}>
        <Text style={styles.forwordsText}>
              forwords!
        </Text>

        <TextInput
          style={{height: 60, width: 200}}
          placeholder = "Email"
          onChangeText={(text) => this.setState({text})}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType= "next"

        />
        <TextInput
          style={{height: 60, width: 200}}
          placeholder = "Password"
          onChangeText={(text) => this.setState({text})}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          returnKeyType= "done"
        />

        <Button style={styles.button}
          title = 'Log In'
          onPress={() => navigate('Home')}
          color = 'purple'
        />
        </View>
    </ScrollView>
  </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 150,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    alignItems: 'center',
    color: '#800080',
    borderRadius: 50,
    width: 160,
  },
  forwordsText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#800080',
    marginVertical: 10,
    fontSize: 30,
  }
});
