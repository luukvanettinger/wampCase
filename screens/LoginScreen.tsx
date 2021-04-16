import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar} from 'react-native';
import React, {useState} from 'react'
import { StackScreenProps } from "@react-navigation/stack";
import { NavigationStackParamList } from "../types";
import axios from 'axios';

export default function LoginScreen({navigation}: StackScreenProps<NavigationStackParamList>) {

    // States
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Login & Navigate to UserFeedScreen
    const onLoginPress = async () => {
        await axios.post('https://api.wearematchplay.com/v2/auth/login', {
            email: username,
            password: password
        }).then((response) => {
            navigation.push("UserFeed", {API_token: response.data.api_token})
        }, (error) => {
            console.log(error)
            Alert.alert('😳','' + error)
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <Text style={styles.logo}>We Are Match Play</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Username..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize='none'
                />
            </View>
            <TouchableOpacity onPress={onLoginPress} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:37,
        color:"black",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#ADB5BD",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#007BFF",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});