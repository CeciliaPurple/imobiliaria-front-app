import {Text, StyleSheet, ImageBackground} from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"



export default function Home() { 
    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">
            <Text>Olá</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    back: {
        width: '100%',
        height: '100%'
    }
})