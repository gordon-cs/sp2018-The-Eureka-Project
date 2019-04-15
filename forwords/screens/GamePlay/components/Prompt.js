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
      switch (promptObj.pinyin) {
        case ("apple"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_apple_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("banana"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_banana_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("carrot"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_carrot_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("cherry"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_cherry_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("cucumber"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_cucumber_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("eggplant"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_eggplant_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("grapes"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_grapes_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("kiwi"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_kiwi_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("leek"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_leek_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("lemon"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_lemon_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("lettuce"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_lettuce_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("onion"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_onion_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("orange"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_orange_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("pear"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_pear_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("pepper"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_pepper_.png")}
              style={styles.promptImage}
            />
          );
          break;
        case ("raddish"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_raddish_.png")}
              style={styles.promptImage}
            />
          );
          break;
        case ("strawberry"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_strawberry_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("tomato"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_tomato_.png")}
              style={styles.promptImage}
            />
          );       
          break;
        case ("watermelon"):
          image = (
            <Image
              source={require("../../../forwords_pictures_/_watermelon_.png")}
              style={styles.promptImage}
            />
          );       
          break;
      }
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
