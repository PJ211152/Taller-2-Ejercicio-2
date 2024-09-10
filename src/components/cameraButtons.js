import * as React from 'react';
import {TouchableOpacity, StyleSheet } from 'react-native';
import Entypo  from "@expo/vector-icons/Entypo";

export default function CameraButton ({icon, color, onPress}) {

    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo  name={icon} size={50} color={color}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})