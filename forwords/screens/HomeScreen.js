import React from 'react';
import axios from 'axios';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import {fullRoutePrefix} from '../constants/API';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentWillMount() {
    console.log("Got into componentDidMount");
    try {
      console.log("Got into try for /people")
      axios.get('http://' + '172.27.43.141' + ':8080' + '/people').then(res => {
        const users = res.data;
        console.log("res: ", res);
        console.log("users: ", users);
        // this.setState({ users });
      });
    } catch (err) {
      throw new Error('/people did not work');
    }
    try {
      console.log("Got into try for /targetLanguage")
      axios.get(fullRoutePrefix + '/targetLanguage').then(res => {
        const targetLanguage = res.data;
        console.log("targetLanguage", targetLanguage);
      });
    } catch (err) { 
      throw new Error('/targetLanguage did not work');
    }    
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

         <View style={styles.pictureContainer}>
            {/* <Image
              source={
                __DEV__
                  ? require('../forwords_pictures_/fruits_and_vegetables_/fruit_apple_.png')
                  : require('../forwords_pictures_/fruits_and_vegetables_/fruit_cherry_.png')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                __DEV__
                  ? require('../forwords_pictures_/fruits_and_vegetables_/fruit_apple_.png')
                  : require('../forwords_pictures_/fruits_and_vegetables_/fruit_cherry_.png')
              }
              style={styles.welcomeImage}
            /> */}
          </View>
          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            <Text style={styles.getStartedText}>
              EXPO baby 6:30pm Monday, November 26th, 2018
            </Text>
          </View>
          <View style={styles.pictureContainer}>
            {/* <Image
              source={
                __DEV__
                  ? require('../assets/images/for.png')
                  : require('../assets/images/words.png')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                __DEV__
                  ? require('../assets/images/words.png')
                  : require('../assets/images/for.png')
              }
              style={styles.welcomeImage}
            /> */}
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  pictureContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
