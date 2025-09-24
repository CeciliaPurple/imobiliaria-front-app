import { View, Text, StyleSheet, ImageBackground } from "react-native"

import Topo from "../components/Topo"
import Imovel from "../components/imovel"


export default function Home() {
    
    return (
        <View style={styles.container}>
            <Topo />
            {/* Banner abaixo do Topo */}
            <ImageBackground
                source={require("../../assets/img/banner.png")} // coloque sua imagem aqui
                style={styles.banner}
            >
            </ImageBackground>

            <Imovel />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    banner: {
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,

        overflow: "hidden",
    },
});
