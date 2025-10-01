import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import Topo from "../components/Topo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function Imovel() {
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <ImageBackground
                    source={require("../../assets/img/casa1.jpg")}
                    style={styles.img}
                >
                    {/* Gradiente escuro embaixo */}
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                        style={styles.gradientOverlay}
                        locations={[0.6, 1]}
                    />
                    {/* Nome + coração */}
                    <View style={styles.overlay}>
                        <Ionicons name="heart-outline" size={32} color="#fff" />
                    </View>

                </ImageBackground>

                <Text style={styles.titulo}>Casa mobiliada no centro de indaia com M² 250 m R$ 5.000,00 </Text>

                <View style={styles.location}>
                    <EvilIcons name="location" size={32} color="#375A76" />
                    <Text style={styles.text_location}>Rua Quarto N° 63, indaia - Centro</Text>
                </View>

                <View style={styles.container_price}>
                    <View style={styles.price}>
                        <Text style={styles.bold}>Valor</Text>
                        <Text style={styles.bold}>R$ 0.000.000</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.light}>Valor</Text>
                        <Text style={styles.light}>R$ 0.000.000</Text>
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Ver mais</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    img: {
        width: '100%',
        height: 300
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "center",
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 20,
        color: "#375A76",
    },
    location: {
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center", // centraliza verticalmente
        gap: 5,
    },
    text_location: {
        fontSize: 16,
        color: "#375A76",
        fontWeight: 500,
    },
    container_price: {
        backgroundColor: '#E3F2FF',
        width: '80%',
        gap: 20,
        padding: 20,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    price: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bold: {
        fontSize: 20,
        fontWeight: 700,
        color: "#375A76",
    },
    light: {
        fontSize: 16,
        color: "#375A76",
    },
    button: {
        backgroundColor: '#146FBA',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})