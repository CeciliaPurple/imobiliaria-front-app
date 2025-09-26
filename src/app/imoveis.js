import React from 'react';
import { Text, StyleSheet, ImageBackground, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Topo from "../components/Topo";

export default function Imoveis() {
    return (
        <View style={styles.container}>
            <Topo />

            <View style={styles.foto}>
                <ImageBackground
                    source={require("../../assets/img/banner.png")}
                    style={styles.banner}
                >
                    <View style={styles.heartContainer}>
                        <AntDesign name="heart" size={30} color="red" />
                    </View>
                </ImageBackground>
            </View>

            <View>
                <Text style={styles.titulo}>Casa Mobilhada no centro de indaia com M² 250 m R$ 5.000,00 </Text>
            </View>

            <View style={styles.row}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style={styles.localizacao}>Rua Quarto N° 63, indaia - Centro</Text>
            </View>

            <View style={styles.card}>
                {/* Linha valor */}
                <View style={styles.row}>
                    <Text style={styles.label}>Valor</Text>
                    <Text style={styles.valor}>R$ 0.000.000</Text>
                </View>

                {/* Linha IPTU */}
                <View style={styles.row}>
                    <Text style={styles.Iptu}>IPTU</Text>
                    <Text style={styles.iptu}>R$ 0,000</Text>
                </View>

                {/* Botões */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.btnPrimary}>
                        <Text style={styles.btnPrimaryText}>Agendar Visita</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSecondary}>
                        <Text style={styles.btnSecondaryText}>Contato</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    banner: {
        width: "100%",
        height: 350,
        justifyContent: "center",
        alignItems: "center"
    },
    heartContainer: {
        position: 'absolute',
        top: 250,
        right: 10,
        padding: 8,
        borderRadius: 20,
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 15,
        color: "#375A76",
        textAlign: "and"
    },
    row: {
        marginTop: 50,
        position: "relative",
        top: 40,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center", // centraliza verticalmente
        gap: 5 // se quiser um espacinho entre ícone e texto (RN 0.71+)
    },
    localizacao: {
        fontSize: 20,
         paddingRight: 90,
        color: "#333"
    },
    card: {
        backgroundColor: "#e6f3ff",
        marginHorizontal: 40,
        top: 80,// azul clarinho do fundo
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4, // sombra no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    label: {
        fontSize: 24,
        fontWeight: "600",
        color: "#2a4a66",
    },
    valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2a4a66",
    },
    iptu: {
        fontSize: 18,
        color: "#2a4a66",
    },
    Iptu: {
        fontSize: 18,
        color: "#2a4a66",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    btnPrimary: {
        flex: 1,
        backgroundColor: "#1976d2",
        border: "2px solid #ffff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    btnPrimaryText: {
        color: "#fff",
        fontWeight: "bold",
    },
    btnSecondary: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 8,
        border: "2px solid #ffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    btnSecondaryText: {
        color: "#2a4a66",
        fontWeight: "600",
        filter: " drop-shadow(0 5px 5px rgba(160, 160, 204, 0.5));"
    },


});
