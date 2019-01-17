import React, { Component } from 'react';
import axios from 'axios';
import { AppRegistry, Button, FlatList, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { fullRoutePrefix } from '../../constants/API';

var backwordsIP = '172.27.43.141';


export default class SinglePlayerModeSelectionScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lessonList: [],
    };
  }


  async componentWillMount() {
    console.log("SINGLEPLAYERMODESELECTIONSCREEN: Got into componentDidMount");
    try {
      console.log("Got into try for /lesson-list")
      axios.get('http://' + backwordsIP + ':8080' + '/lesson-list').then(res => {
        const lessons = res.data;
        console.log("res: ", res);
        console.log("lessons: ", lessons);
        this.setState({
          isLoading: false,
          lessonList: lessons
        });
      });
    } catch (err) {
      throw new Error('/lesson-list did not work');
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.headingView}>
          <Text style={styles.headingText}>
            Single Player Mode
        </Text>
          <Text style={styles.icon}>
            👤
        </Text>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        </View>
      )
    }
    else return (

      <View style={styles.MainContainer}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>
            Single Player Mode
        </Text>
          <Text style={styles.icon}>
            👤
        </Text>
        </View>
        <FlatList
          data={this.state.lessonList}
          renderItem={({ item }) => 
            <Text>{item.Title}</Text>}
          keyExtractor={item => item.Number}
        />
        <Button style={styles.button}
          title = '▶️'
          onPress={() => navigate('Instruction')}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,

  },

  headingText: {
    // color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  headingView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  icon: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 80,
  }
});