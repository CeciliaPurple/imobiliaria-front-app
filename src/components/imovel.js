import { View, Text, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';


export default function Imovel() {
    return (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                <LinearGradient
                    colors={['rgba(0,0,0,1)', 'transparent']}
                    locations={[0, 0.4]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.gradientOverlay}
                />
            </View>

            <View style={styles.container_info}>
                <View style={styles.container_icon}>
                    <View>
                        <Image style={styles.icon} source={require('../../assets/icons/home-outline.svg')}/>
                        <Text><b>000</b>m²</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 250,
        backgroundColor: '#ff9c9cff',
        borderRadius: 10
    },
    img: {
        flex: 3,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent 35%)',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    container_info: {
        flex: 1
    },
    icon: {
        width: 25,
        height: 25
    },
})