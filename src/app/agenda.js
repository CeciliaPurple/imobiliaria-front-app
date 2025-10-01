import { View, Text, StyleSheet, ScrollView, TextInput,TouchableOpacity  } from "react-native";
import Topo from "../components/Topo";
import { Link } from "expo-router";

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
                        keyboardType="default"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data"
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Horário: 00:00"
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Observações"
                        multiline
                        keyboardType="default"
                    />
                </View>
                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={[styles.botao, styles.cancelar]}>
                        <Text style={styles.textoCancelar}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.botao, styles.salvar]}>
                        <Link href="/visitaagendada">
                            <Text style={styles.textoSalvar}>Salvar</Text>
                        </Link>
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
    botoesContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        marginBottom: 40,
    },
    botao: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        width: 120,
    },
    cancelar: {
        backgroundColor: "#E53935",
    },
    salvar: {
        backgroundColor: "#F5F5F5",
    },
    textoCancelar: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    textoSalvar: {
        color: "#3F51B5",
        fontWeight: "bold",
        fontSize: 16,
    },
});
