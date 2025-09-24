import { View, Text, StyleSheet } from "react-native"
import Imovel from "../components/imovel"

export default function Home() {
    return (
        <View style={styles.container}>
            <Imovel/>
        </View>
    )
}

const styles = StyleSheet.create({

})