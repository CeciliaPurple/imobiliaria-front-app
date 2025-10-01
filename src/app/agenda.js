import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import Topo from "../components/Topo";

export default function Agenda() {
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.titulo}>Agendar Visita</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data:"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Horario: 00:00"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        defaultValue="(00) 00000-0000"
                    />

                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Observações"
                        multiline
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    titulo: {
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
    formContainer: {
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: '#84C4FB',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#375A76',
        marginTop: 15,
        fontWeight: 'bold',
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});