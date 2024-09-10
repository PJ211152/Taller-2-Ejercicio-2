import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    ImageBackground
  } from "react-native";
  import ListComponent from '../components/listComponent';

export const DataSaved = () => {
    return(
        <View style={style.container}>
            <ListComponent/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexGrow: 1,
      }
})