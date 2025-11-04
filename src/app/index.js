import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native"

import Topo from "../components/Topo"
import Imovel from "../components/imovel"


export default function Home() {

    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView style={styles.container}>

                {/* Banner abaixo do Topo */}
                <ImageBackground
                    source={require("../../assets/img/banner.png")}
                    style={styles.banner}
                >
                </ImageBackground>

                {/*Destaques*/}
                <View style={styles.container_destaque}>
                    <Text style={styles.title}>Destaques</Text>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.listaImoveis}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Imovel data={{
                            nome: "Casa Moderna",
                            area: "150",
                            quartos: "3",
                            banheiros: "2",
                            vagas: "2",
                            preco: "450.000,00",
                            imagem: require("../../assets/img/casa1.jpg"),
                            favorito: false
                        }} />

                        <Imovel />
                        <Imovel />
                        <Imovel />
                        <Imovel />
                        <Imovel />
                    </ScrollView>
                </View>

                {/*Lançamentos*/}
                <View style={styles.container_destaque}>
                    <Text style={styles.title}>Lançamentos</Text>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.listaImoveis}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Imovel />
                        <Imovel />
                        <Imovel />
                        <Imovel />
                        <Imovel />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    banner: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        overflow: "hidden",
    },
    container_destaque: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: 20,
        gap: 10,
        marginBottom: 20
    },
    listaImoveis: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        paddingLeft: 10,
        color: '#375A76'
    }
});
