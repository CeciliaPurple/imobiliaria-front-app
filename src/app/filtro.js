import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Topo from "../components/Topo";
import Imovel from "../components/imovel";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Filtro() {
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView styles={styles.container_scroll}>
                <View style={styles.container_filter}>
                    <View style={styles.btn_filter}>
                        <Ionicons name="filter" size={24} color="white" />
                        <Text style={styles.text}>Filtros</Text>
                    </View>
                </View>
                <View style={styles.container_imovel}>
                    <Imovel />
                    <Imovel />
                    <Imovel />
                    <Imovel />
                    <Imovel />
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
    container_filter: {
        width: '100%',
        backgroundColor: '#E3F2FF',
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
    },
    btn_filter: {
        width: 'fit-content',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#146fba',
        borderRadius: 10,
        gap: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    container_imovel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 60,
    },
})