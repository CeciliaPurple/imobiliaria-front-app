import { View, Text, StyleSheet, ScrollView } from "react-native"

import Topo from "../../components/Topo"
import Imovel from "../../components/imovel"

export default function Favoritos() {
    return (
        <View style={styles.container}>
            <Topo/>
            <ScrollView>
                <Text style={styles.title}>Favoritos</Text>

                <View style={styles.container_imovel}>
                   <Imovel/> 
                   <Imovel/> 
                   <Imovel/> 
                   <Imovel/> 
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
    title: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#146FBA',
        backgroundColor: '#E3F2FF',
        padding: 10,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
    },
    container_imovel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 60,
    },
})