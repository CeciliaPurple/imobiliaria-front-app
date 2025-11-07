import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Topo from "../../components/Topo";

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
                        keyboardType="email-address"
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
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Observações"
                        multiline
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Agendar Visita</Text>
                    </TouchableOpacity>
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
    button: {
        backgroundColor: '#146FBA',
        width: 'fit-content',
        padding: 15,
        borderRadius: 10,
        color: '#fff',
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});