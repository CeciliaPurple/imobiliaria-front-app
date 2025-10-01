import React from "react";
import { Image } from 'expo-image';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Topo from "../components/Topo";

export default function Agenda() {
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.titulo}>Visita Agendada</Text>

                <View style={styles.card}>
                    <Image
                        source={require('../../assets/img/luxo.jpg')} // substitua pelo seu caminho de imagem
                        style={styles.imagem}
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.nome}>Nome</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.preco}>R$ 1.000.000,00</Text>
                        <TouchableOpacity style={styles.botao}>
                            <Text style={styles.botaoTexto}>Ver mais</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.cardNome}>

                        <Text style={styles.label}>Nome:</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            defaultValue="Deivid"
                            keyboardType="default"
                        />
                    </View>


                    <View style={styles.cardEmail}>

                        <Text style={styles.label}>Email:</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            defaultValue="Deivid@gmail.coom"
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.cardData}>

                        <Text style={styles.label}>Data:</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Data: 00/00/0000"
                            defaultValue="01/10/2025"
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.cardHorário}>

                        <Text style={styles.label}>Horário:</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Horário: 14:50"
                            defaultValue="14:50"
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.cardTel}>

                        <Text style={styles.label}>Telefone:</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Telefone: (00) 00000-0000"
                            defaultValue="(00) 00000-0000"
                            keyboardType="default"
                        />
                    </View>

                    <View style={styles.cardObservações}>

                        <Text style={styles.label}>Observações:</Text>

                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            placeholder="Obs:"
                            defaultValue="Vou ver o imóvel com minha esposa."
                            keyboardType="default"
                        />
                    </View>
                </View>
                <View style={styles.botoesContainer}>
                    <TouchableOpacity style={[styles.botao, styles.cancelar]}>
                        <Text style={styles.textoCancelar}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.botao, styles.salvar]}>
                        <Text style={styles.textoSalvar}>Salvar</Text>
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
    card: {
        width: 400,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    imagem: {
        width: '100%',
        height: 180,
    },
    overlay: {
        position: 'absolute',
        bottom: 60,
        left: 10,
    },
    nome: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E3F2FF',
    },
    preco: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#146FBA',
    },
    botao: {
           color: '#146FBA',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    botaoTexto: {
        color: '#375a76',
        fontWeight: 'bold',
        fontSize: 14,
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
        marginTop: 8,
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
    label: {
        fontSize: 16,
        fontWeight: "bold",
        position: "relative",
        top: 7,
        left: 3,
        color: "#333"
    }
});
