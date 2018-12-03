import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { fullRoutePrefix } from '../constants/API';

export default class FlatListBasics extends Component {
  state = {
    lessonList: [],
  };

  async componentWillMount() {
    try {
      console.log("IN try for /lessonList")
      axios.get('http://' + '172.27.43.141' + ':8080' + '/lessonList').then(res => {
        const lessonList = res.data;
        console.log("lessonList", lessonList);
      });
    } catch (err) {
      throw new Error('/lessonList did not work');
    }
    this.setState({ lessonList });
  }


  // Need it to eventually work like this file – using a separate service file where in *that* file, we hardcore axios functions
  // async componentWillMount() {
  //   try {
  //     const profile = await user.getProfileInfo();
  //     const personType = profile.PersonType;
  //     const [majors, minors, states, countries, departments, buildings] = await Promise.all([
  //       goStalk.getMajors(),
  //       goStalk.getMinors(),
  //       goStalk.getStates(),
  //       goStalk.getCountries(),
  //       goStalk.getDepartments(),
  //       goStalk.getBuildings(),
  //     ]);
  //     this.setState({
  //       majors,
  //       minors,
  //       states,
  //       countries,
  //       departments,
  //       buildings,
  //       personType,
  //     });
  //   } catch (error) {
  //     // error
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={({ item }) => <Text style={styles.item}>{this.state.lessonList[1]}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
