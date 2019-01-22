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
  View,
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { fullRoutePrefix } from '../constants/API';

var backwordsIP = '172.27.43.141';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    console.log("Got into componentDidMount");
    try {
      console.log("Got into try for /people")
      axios.get('http://' + backwordsIP + ':8080' + '/people').then(res => {
        const users = res.data;
        console.log("res: ", res);
        console.log("users: ", users);
        // this.setState({ users });
      });
    } catch (err) {
      throw new Error('/people did not work');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
            <Text style={styles.icon}>
              👤
          </Text>
          </View>
          <Button style={styles.button}
            title='Single Player Mode!'
            onPress={() => navigate('SinglePlayerModeSelection')}
            color='purple'
          />
          <Button style={styles.button}
            title='Multi-Player Mode!'
            onPress={() => navigate('JoinMultiplayer')}
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
