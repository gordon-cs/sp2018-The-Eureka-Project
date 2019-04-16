import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Prompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promptID: this.props,
      imageURL: this.props
    };
  }
  render() {
    const promptObj = this.props.promptObj;
    let image;

    if (promptObj.lessonID == 21) {
          image = (
            <Image
              source={{uri: 'http://172.27.43.141:9999/_'+promptObj.meaning+'_.png'}}
              style={styles.promptImage}
            />
          ); 
      return <View style={styles.mainContainer}>{image}</View>;
      } else {
      return (
        <View style={styles.mainContainer}>
          <Text style={styles.promptText}>{promptObj.pinyin}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    borderRadius: 80,
    backgroundColor: "white"
  },
  promptText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  promptImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: "contain"
  }
});
