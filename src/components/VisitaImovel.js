import { View, Text, StyleSheet, ImageBackground, ScrollView, Platform } from "react-native"
import { useState } from "react";
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function VisitasImovel({ data }) {
    const [imagem, setImagem] = useState(data?.imagem || require("../../assets/img/luxo.jpg"));
    const [nome, setNome] = useState(data?.nome || "Daniel Santana");
    const [data_visita, setDataVisita] = useState(data?.data_visita || "25/08/2025");
    const [horario, setHorario] = useState(data?.horario || "16:30");
    const [telefone, setTelefone] = useState(data?.telefone || "(12) 99600-0000");
    const [status, setStatus] = useState(data?.status || "Pendente");
    return (
        <Link href={'/agenda'} asChild>
            <View style={styles.container_imovel}>

                <View style={styles.img}>
                    <Image
                        style={styles.img}
                        source={imagem}
                    />
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
                            <Text style={styles.text}>{nome}</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Data: </Text>
                            <Text style={styles.text}>{data_visita}</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Horário: </Text>
                            <Text style={styles.text}>{horario}</Text>
                        </View>

                        <View style={styles.group_text}>
                            <Text style={styles.bold}>Tel: </Text>
                            <Text style={styles.text}>{telefone}</Text>
                        </View>
                    </View>

                    <View style={styles.container_status}>
                        <Text style={styles.status_text}>Status:</Text>
                        <Text style={styles.status}>{status}</Text>
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