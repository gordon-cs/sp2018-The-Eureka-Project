import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity
} from "react-native";
import forwordsStyles from '../../../constants/forwordsStyles';

export default class AddCourse extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
        courseCode: '',
        courseTitle: '',
        language: '',
    };
  }



  // parameter courseCode: text input from the user about which course to add
  // then navigate back to the Home Screen
  async addCourseOnPress() {
    const { navigate } = this.props.navigation;
    axios
      .post(`${httpsRoute}/add-course`, {
        courseCode: this.state.courseCode
      })
      .then(function(res) {
        console.log("/add-course worked");
        navigate("Home");
      })
      .catch(function(err) {
        console.log("/add-course failed");
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const role = this.props.navigation.state.params.role; // host, member, or solo

    if (role === 'student') {
      return (
        <View style={forwordsStyles.container}>
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>Add a Course</Text>
          </View>
          <Text style={forwordsStyles.mainText}>
            Enter the course code given by your instructor.
          </Text>
          <TextInput
            style={forwordsStyles.textInput}
            alignItems="center"
            placeholder="Course Code"
            onChangeText={courseCode => this.setState({ courseCode })}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="black"
            returnKeyType="done"
            keyboardType="default"
          />
          <TouchableOpacity
            style={forwordsStyles.primaryButton}
            onPress={() => this.addCourseOnPress()}
          >
            <Text style={forwordsStyles.buttonText}>Add Course</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (role === 'teacher') {
      return (
        <View style={forwordsStyles.container}>
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>Create a Course</Text>
          </View>
          <Text style={forwordsStyles.mainText}>
            Enter the details of the course you are creating.
          </Text>


          <TextInput
            style={forwordsStyles.textInput}
            alignItems="center"
            placeholder="Course Title"
            onChangeText={courseTitle => this.setState({ courseTitle })}
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="black"
            returnKeyType="done"
            keyboardType="default"
          />

          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="Chinese" value="Chinese" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="English" value="English" />
          </Picker>



          <TouchableOpacity
            style={forwordsStyles.primaryButton}
            onPress={() => this.addCourseOnPress()}
          >
            <Text style={forwordsStyles.buttonText}>Create Course</Text>
          </TouchableOpacity>
        </View>
      );
      
    }
  }
}