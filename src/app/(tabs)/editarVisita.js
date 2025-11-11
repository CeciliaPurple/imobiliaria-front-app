import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import Topo from "../../components/Topo";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function EditarVisita() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const handleExcluir = () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta visita?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => {
                        // Aqui você implementará a lógica para excluir do banco de dados
                        Alert.alert(
                            "Sucesso",
                            "Visita excluída com sucesso!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => router.back()
                                }
                            ]
                        );
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleSalvar = () => {
        // Aqui você implementará a lógica para salvar no banco de dados
        // Por enquanto, apenas mostramos um alerta
        if (!nome || !email || !data || !horario || !telefone) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
            return;
        }

        // Simulação de salvamento
        Alert.alert(
            "Sucesso",
            "Visita atualizada com sucesso!",
            [
                { 
                    text: "OK", 
                    onPress: () => router.back() 
                }
            ]
        );
    };
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [telefone, setTelefone] = useState("");
    const [observacoes, setObservacoes] = useState("");

    useEffect(() => {
        // Aqui você fará a chamada para o banco de dados usando o id
        // Por enquanto, vamos usar dados mockados
        const mockVisitas = [
            {
                id: "1",
                nome: "Daniel Santana",
                email: "daniel@email.com",
                data_visita: "25/08/2025",
                horario: "16:30",
                telefone: "(12) 99600-0000",
                observacoes: "Cliente interessado em financiamento",
                status: "Pendente"
            },
            {
                id: "2",
                nome: "Maria Silva",
                email: "maria@email.com",
                data_visita: "26/08/2025",
                horario: "14:00",
                telefone: "(12) 99600-1111",
                observacoes: "Prefere visita no período da tarde",
                status: "Confirmado"
            }
        ];

        const visita = mockVisitas.find(v => v.id === id);
        if (visita) {
            setNome(visita.nome);
            setEmail(visita.email);
            setData(visita.data_visita);
            setHorario(visita.horario);
            setTelefone(visita.telefone);
            setObservacoes(visita.observacoes);
        }
    }, [id]);
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.titulo}>Editar Visita</Text>

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
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
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
                        style={styles.buttonExcluir}
                        onPress={handleExcluir}
                    >
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonSalvar}
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
    buttonExcluir: {
        backgroundColor: '#DC3545',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        minWidth: 100,
        alignItems: 'center'
    },
    buttonSalvar: {
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