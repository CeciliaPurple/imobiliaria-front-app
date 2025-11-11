import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import Topo from "../../components/Topo";
import { router } from "expo-router";
import { useState } from "react";

export default function Agenda() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [telefone, setTelefone] = useState('(00) 00000-0000');
    const [observacoes, setObservacoes] = useState('');

    const handleSalvar = () => {
        // Validação dos campos obrigatórios
        if (!nome || !email || !data || !horario || !telefone) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }

        // Aqui você pode adicionar a lógica para enviar os dados para seu backend
        Alert.alert(
            'Sucesso',
            'Visita agendada com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => router.back()
                }
            ]
        );
    };
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.titulo}>Agendar Visita</Text>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data: DD/MM/AAAA"
                        value={data}
                        onChangeText={setData}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Horario: 00:00"
                        value={horario}
                        onChangeText={setHorario}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Telefone"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Observações"
                        value={observacoes}
                        onChangeText={setObservacoes}
                        multiline
                    />
                </View>

                <View style={styles.containerButtons}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#DC3545' }]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSalvar}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
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
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 60,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#146FBA',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        minWidth: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});