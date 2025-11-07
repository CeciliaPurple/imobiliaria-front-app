import { View, Text, StyleSheet, ScrollView } from "react-native"
import Topo from "../../components/Topo"
import VisitaImovel from '../../components/VisitaImovel'

export default function Visitas() {

    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.title}>Minhas Visitas</Text>

                <View style={styles.container_visita}>
                    <VisitaImovel/>
                    <VisitaImovel/>
                    <VisitaImovel/>
                    <VisitaImovel/>
                    <VisitaImovel/>
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
    container_visita: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 60,
    }
})