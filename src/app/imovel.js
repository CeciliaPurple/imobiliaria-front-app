import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import Topo from "../components/Topo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link } from "expo-router";

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

                    <View style={styles.container_btn}>
                        <Link href={'/agenda'}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Agendar Visita</Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href={'/'}>
                            <TouchableOpacity style={styles.button2}>
                                <Text style={styles.buttonText2}>Contato</Text>
                            </TouchableOpacity>
                        </Link>

                    </View>
                </View>

                <View style={styles.container_info}>
                    <View style={styles.infoItem}>
                        <Ionicons name="home-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>000m²</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="bed-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>0 Quartos</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="water-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>0 Banheiros</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="car-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>0 Vagas</Text>
                    </View>
                </View>

                <View style={styles.container_room}>
                    <Text style={styles.bold}>Ambientes</Text>
                    <View style={styles.container_card}>
                        <Text style={styles.text_card}>Área de Serviços</Text>
                        <Text style={styles.text_card}>Closet</Text>
                        <Text style={styles.text_card}>Escritório</Text>
                        <Text style={styles.text_card}>Piscina</Text>
                    </View>

                    <Text style={styles.bold}>Conveniências</Text>
                    <View style={styles.container_card}>
                        <Text style={styles.text_card}>Área de Serviços</Text>
                        <Text style={styles.text_card}>Closet</Text>
                        <Text style={styles.text_card}>Escritório</Text>
                        <Text style={styles.text_card}>Piscina</Text>
                    </View>
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
        width: '70%',
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
        alignSelf: 'center',
        marginTop: 40,
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
    container_btn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 40,
        padding: 20,
    },
    button: {
        backgroundColor: '#146FBA',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    button2: {
        width: 'fit-content',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonText: {
        fontWeight: 700,
        color: '#F5F5F5',
    },
    buttonText2: {
        fontWeight: 700,
        color: '#375A76',
    },
    container_info: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
        alignSelf: 'center',
        gap: 40,
    },
    infoItem: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "end",
        gap: 10,
    },
    infoText: {
        fontSize: 20,
        color: '#375A76',
    },
    container_room: {
        gap: 20,
        padding: 40,
    },
    container_card: {
        width: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#E3F2FF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        padding: 10,
        gap: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text_card: {
        width: 'fit-content',
        padding: 10,
        color: '#146FBA',
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: '#E3F2FF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
})