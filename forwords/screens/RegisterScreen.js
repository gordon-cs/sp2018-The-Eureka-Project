import axios from 'axios';
import React, {Component} from 'React';
import {Button,
    StyleSheet,
    Text,
    TextInput,
    View} from 'react-native';

var backwordsIP = '172.27.43.141';

export default class RegisterScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        
        this.registerStudent = this.registerStudent.bind(this);

        this.state = {
            firstName:  '',
            lastName: '',
            email: '',
            password: '',
            role: '',
        };
    }

    registerStudent() {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            role: 'Student',         
        }
        console.log('before registerStudent try statement', data)
        try {
            console.log('entered try block')
            axios.post('http://' + backwordsIP + ':8080' + '/user', data);
            // console.log(res);
            console.log("Student registered");
        } catch (err) {
            throw new Error('Post /users did not work');
        }
        const {navigate} = this.props.navigation;
        navigate('Login');
    }
    render() {
        let content;
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    Register!
                </Text>
                <TextInput
                    onChangeText={(firstName) => this.setState({firstName})}
                    placeholder='First Name'
                    returnKeyType= "next"
                    style={{height: 60, width: 200}}
                />
                <TextInput 
                    onChangeText={(lastName) => this.setState({lastName})}
                    placeholder='Last Name' 
                    returnKeyType= "next"
                    style={{height: 60, width: 200}}
                />
                <TextInput 
                    onChangeText={(email) => this.setState({email})}
                    placeholder='Email'
                    returnKeyType= "next"
                    style={{height: 60, width: 200}}/>
                <TextInput 
                    onChangeText={(password) => this.setState({password})}
                    placeholder='Password' 
                    returnKeyType= "next"
                    secureTextEntry={true}
                    style={{height: 60, width: 200}}
                />
                <TextInput 
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    style={{height: 60, width: 200}} />
                <Text>
                    Register as...
                </Text>
                <Button 
                    onPress = {this.registerStudent}
                    style={styles.button}
                    title='Student'/>
                <Button 
                    onPress = {() => console.log('teacher', this.state.firstName, this.state.lastName,this.state.email,this.state.password)}
                    style={styles.button}
                    title='Teacher'/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        color: '#800080',
        borderRadius: 50,
        width: 160,
    },
    container: {
        flex: 10,
        backgroundColor: '#fff',
        padding: 10,
    },
    contentContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
        marginVertical: 150,
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#800080',
        marginVertical: 10,
        fontSize: 30,
    }
})