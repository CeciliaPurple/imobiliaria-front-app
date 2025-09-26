import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function VisitasImovel() {
    return (
        <Link href={'/agenda'} asChild>
            <View style={styles.container_imovel}>

                <View style={styles.img}>
                    <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                    <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.7)"]}
                        style={styles.gradientOverlay}
                        locations={[0.5, 1]}
                    />
                </View>


                <View style={styles.container_info}>
                    <View style={styles.container_text}>
                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Nome: </Text>
                            <Text style={styles.text}>Daniel Santana</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Data: </Text>
                            <Text style={styles.text}>25/08/2025</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Horário: </Text>
                            <Text style={styles.text}>16:30</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Tel: </Text>
                            <Text style={styles.text}>(12) 99600-0000</Text>
                        </View>
                    </View>

                    <View style={styles.container_status}>
                        <Text style={styles.status_text}>Status:</Text>
                        <Text style={styles.status}>Pendente</Text>
                    </View>
                </View>

            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    container_imovel: {
        width: 350,
        backgroundColor: '#f5f5f5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        gap: 20,
        ...Platform.select({
            android: {
                elevation: 4,
            }
        })
    },
    img: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden'
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
    container_info: {
        gap: 10,
    },
    container_text: {
        gap: 5,
    },
    group_text: {
        display: 'flex',
        flexDirection: 'row',
    },
    bold: {
        fontWeight: 600,
        color: '#375A76'
    },
    text: {
        color: '#375A76'
    },
    container_status: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 5,
        gap: 10,
        backgroundColor: '#146FBA',
        borderRadius: 10,
    },
    status_text: {
        fontWeight: '500',
        color: '#fff'
    },
    status: {
        color: '#ffd51bff'
    },
})