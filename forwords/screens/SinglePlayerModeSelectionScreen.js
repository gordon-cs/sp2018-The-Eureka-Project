import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { fullRoutePrefix } from '../constants/API';


export default class FlatListBasics extends Component {
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
    console.log("Got into componentDidMount");
    try {
      console.log("Got into try for /lesson-list")
      axios.get('http://' + backwordsIP + ':8080' + '/lesson-list').then(res => {
        const lessons = res.data;
        console.log("res: ", res);
        console.log("lessons: ", lessons);
        this.setState({
          isLoading: false,
          lessonList: responseJson
        });
      });
    } catch (err) {
      throw new Error('/lesson-list did not work');
    }
  }

  // async componentWillMount() {
  //   try {
  //     console.log("IN try for /lessonList")
  //     axios.get('http://' + '172.27.43.141' + ':8080' + '/lessonList').then(res => 
  //       res.json())
  //         this.setState({
  //           isLoading: false,
  //           lessonList: responseJson
  //         });
  //         // const lessonList = res.data;
  //         console.log("lessonList", lessonList);
  //   } catch (err) {
  //     throw new Error('/lessonList Route did NOT work');
  //   }
  // }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
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
        />
        {/* renderItem={({ item }) => <Text style={styles.item}>{this.state.lessonList[1]}</Text>}
        /> */}
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
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })
