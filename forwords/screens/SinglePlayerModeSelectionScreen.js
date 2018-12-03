import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import {fullRoutePrefix} from '../constants/API';

export default class FlatListBasics extends Component {
  state = {
    lessonList: [],
  };
  
async componentWillMount() {
    try {
      console.log("IN try for /lessonList")
      axios.get(fullRoutePrefix + '/lessonList').then(res => {
        const lessonList = res.data;
        console.log("lessonList", lessonList);
      });
    } catch (err) { 
      throw new Error('/lessonList did not work');
    }    
    this.setState({ lessonList });
  }
  
    render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
