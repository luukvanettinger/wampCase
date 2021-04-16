import {Alert, Text, View, FlatList, StyleSheet, StatusBar} from "react-native";
import React, {useState, useEffect} from 'react'
import { StackScreenProps } from "@react-navigation/stack";
import { NavigationStackParamList } from "../types";
import axios from "axios";

export default function UserFeedScreen({route}: StackScreenProps<NavigationStackParamList>) {
    // Params
    const { API_token } = route.params;

    // States
    const [userMatches, setUserMatches] = useState([])

    // Get matches that user follows
    useEffect(() => {
        axios.get('https://api.wearematchplay.com/v2/matches', {
            headers: { Authorization: `Bearer ${API_token}` }
        }).then((response) => {
            const data = response.data.data.map((x) => x.course);
            setUserMatches(data.filter((x) => x !== null))
        }, (error) => {
            Alert.alert('😳','' + error)
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"dark-content"} />
            <Text style={styles.title}> Welcome to We Are Match Play</Text>
            { userMatches ?
                <FlatList data={userMatches} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => (
                    <View style={styles.card}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textLocation}>{item.country} - {item.city}</Text>
                        <Text style={styles.textDate}>{item.created_at}</Text>
                    </View>
                )}/>
                :
                <Text>Loading...</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        marginTop: 70,
        fontWeight:"bold",
        fontSize:22,
        color:"black",
        marginBottom: 20
    },
    card: {
        width: 350,
        height: 500,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        marginTop: 10
    },
    text:{
        fontWeight:"bold",
        fontSize:17,
        color:"black",
    },
    textName:{
        fontWeight:"bold",
        fontSize:20,
        color:"black",
        marginLeft: 10,
        marginTop: 10
    },
    textLocation:{
        fontWeight:"bold",
        fontSize:15,
        color:"gray",
        marginLeft: 10,
        marginTop: 10
    },
    textDate: {
        fontWeight:"bold",
        fontSize:15,
        color:"gray",
        marginLeft: 10,
        marginTop: 10,
        position: 'absolute',
        bottom: 10
    }
});