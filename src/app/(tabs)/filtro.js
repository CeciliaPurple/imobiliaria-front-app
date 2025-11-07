import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Topo from "../../components/Topo";
import Imovel from "../../components/imovel";
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalFiltros from '../../components/ModalFiltros'; 

// DADOS DE EXEMPLO
const LISTA_IMOVEIS = [
    { 
        id: 1,
        titulo: "Casa mobiliada no centro de indaia com M² 250 m R$ 5.000,00",
        endereco: "Rua Quarto N° 63, indaia - Centro",
        valorVenda: "250.000,00",
        valorIPTU: "2.500,00",
        area: "75",
        quartos: "2",
        banheiros: "1",
        vagas: "1",
        imagem: require("../../../assets/img/casa1.jpg"),
        favorito: false,
        ambientes: ["Área de Serviços", "Closet", "Escritório", "Piscina"],
        conveniencias: ["Área de Serviços", "Closet", "Escritório", "Piscina"]
    },
    { 
        id: 2,
        titulo: "Casa com Piscina próximo ao centro",
        endereco: "Rua Cinco N° 123, indaia - Centro",
        valorVenda: "450.000,00",
        valorIPTU: "4.500,00",
        area: "200",
        quartos: "3",
        banheiros: "2",
        vagas: "2",
        imagem: require("../../../assets/img/casa1.jpg"),
        favorito: false,
        ambientes: ["Área de Serviços", "Closet", "Escritório", "Piscina"],
        conveniencias: ["Área de Serviços", "Closet", "Escritório", "Piscina"]
    }
];
// ---------------------------------------------------------

export default function Filtro() {
    const [modalVisible, setModalVisible] = useState(false);

    // ESTADO COMPLETO DOS FILTROS
    const [filtrosAtivos, setFiltrosAtivos] = useState({
        titulo: '',
        endereco: '',
        valorVendaMin: '',
        valorVendaMax: '',
        valorIPTUMin: '',
        valorIPTUMax: '',
        areaMin: '',
        areaMax: '',
        quartos: '0',
        banheiros: '0',
        vagas: '0',
        ambientes: [],
        conveniencias: []
    });

    const [imoveisFiltrados, setImoveisFiltrados] = useState(LISTA_IMOVEIS);

    const aplicarFiltros = (novosFiltros) => {
        setFiltrosAtivos(novosFiltros);

        const listaFiltrada = LISTA_IMOVEIS.filter(imovel => {
            let passaNoFiltro = true;

            // Filtro por título
            if (novosFiltros.titulo && !imovel.titulo.toLowerCase().includes(novosFiltros.titulo.toLowerCase())) {
                passaNoFiltro = false;
            }

            // Filtro por endereço
            if (novosFiltros.endereco && !imovel.endereco.toLowerCase().includes(novosFiltros.endereco.toLowerCase())) {
                passaNoFiltro = false;
            }

            // Filtro por valor de venda
            const valorVendaAtual = Number(imovel.valorVenda.replace(".", "").replace(",", "."));
            const valorVendaMin = Number(novosFiltros.valorVendaMin);
            const valorVendaMax = Number(novosFiltros.valorVendaMax);

            if (valorVendaMin > 0 && valorVendaAtual < valorVendaMin) {
                passaNoFiltro = false;
            }
            if (valorVendaMax > 0 && valorVendaAtual > valorVendaMax) {
                passaNoFiltro = false;
            }

            // Filtro por valor de IPTU
            const valorIPTUAtual = Number(imovel.valorIPTU.replace(".", "").replace(",", "."));
            const valorIPTUMin = Number(novosFiltros.valorIPTUMin);
            const valorIPTUMax = Number(novosFiltros.valorIPTUMax);

            if (valorIPTUMin > 0 && valorIPTUAtual < valorIPTUMin) {
                passaNoFiltro = false;
            }
            if (valorIPTUMax > 0 && valorIPTUAtual > valorIPTUMax) {
                passaNoFiltro = false;
            }

            // Filtro por área
            const areaAtual = Number(imovel.area);
            const areaMin = Number(novosFiltros.areaMin);
            const areaMax = Number(novosFiltros.areaMax);

            if (areaMin > 0 && areaAtual < areaMin) {
                passaNoFiltro = false;
            }
            if (areaMax > 0 && areaAtual > areaMax) {
                passaNoFiltro = false;
            }

            // Filtros por quantidade
            if (Number(novosFiltros.quartos) > 0 && Number(imovel.quartos) < Number(novosFiltros.quartos)) {
                passaNoFiltro = false;
            }
            if (Number(novosFiltros.banheiros) > 0 && Number(imovel.banheiros) < Number(novosFiltros.banheiros)) {
                passaNoFiltro = false;
            }
            if (Number(novosFiltros.vagas) > 0 && Number(imovel.vagas) < Number(novosFiltros.vagas)) {
                passaNoFiltro = false;
            }

            // Filtros por ambientes e conveniências
            if (novosFiltros.ambientes.length > 0) {
                const hasMatch = novosFiltros.ambientes.some(ambiente => 
                    imovel.ambientes.includes(ambiente)
                );
                if (!hasMatch) passaNoFiltro = false;
            }

            if (novosFiltros.conveniencias.length > 0) {
                const hasMatch = novosFiltros.conveniencias.some(conveniencia => 
                    imovel.conveniencias.includes(conveniencia)
                );
                if (!hasMatch) passaNoFiltro = false;
            }

            return passaNoFiltro;
        });

        setImoveisFiltrados(listaFiltrada);
        setModalVisible(false);
    };
    
    return (
        <View style={styles.container}>
            <Topo />
            
            <ModalFiltros 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onApply={aplicarFiltros}
                filtrosIniciais={filtrosAtivos}
            />

            <ScrollView style={styles.container_scroll}>
                <View style={styles.container_filter}>
                    <TouchableOpacity 
                        style={styles.btn_filter} 
                        onPress={() => setModalVisible(true)} 
                        activeOpacity={0.8}
                    >
                        <Ionicons name="filter" size={24} color="white" />
                        <Text style={styles.text}>Filtros</Text>
                    </TouchableOpacity>
                    
                    {/* Exibe quantos imóveis foram encontrados */}
                    <Text style={{ marginTop: 10 }}>
                        {imoveisFiltrados.length} imóveis encontrados.
                    </Text>
                </View>

                <View style={styles.container_imovel}>
                    {imoveisFiltrados.map((imovel) => (
                        <Imovel 
                            key={imovel.id} 
                            data={{
                                nome: imovel.titulo,
                                area: imovel.area,
                                quartos: imovel.quartos,
                                banheiros: imovel.banheiros,
                                vagas: imovel.vagas,
                                preco: imovel.valorVenda,
                                imagem: imovel.imagem,
                                favorito: imovel.favorito
                            }} 
                        />
                    ))}

                    {imoveisFiltrados.length === 0 && (
                        <Text style={styles.noResults}>Nenhum imóvel encontrado com estes filtros.</Text>
                    )}
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
        alignSelf: 'flex-start',
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 60,
    },
    noResults: {
        fontSize: 16,
        color: '#777',
        marginTop: 30,
        textAlign: 'center',
    }
});