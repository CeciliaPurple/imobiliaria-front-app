import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Topo from "../components/Topo";
import Imovel from "../components/imovel";
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalFiltros from '../components/ModalFiltros'; 

// DADOS DE EXEMPLO
const LISTA_IMOVEIS = [
    { id: 1, tipoImovel: 'Apartamento', preco: 250000, quartos: 2, banheiros: 1, garagens: 1, ambientes: ['Área de Serviços'], conveniencias: ['Mobiliado'] },
    { id: 2, tipoImovel: 'Casa', preco: 450000, quartos: 3, banheiros: 2, garagens: 2, ambientes: ['Piscina', 'Jardim'], conveniencias: ['Ar-condicionado'] },
    { id: 3, tipoImovel: 'Apartamento', preco: 180000, quartos: 1, banheiros: 1, garagens: 0, ambientes: ['Lavanderia'], conveniencias: [] },
    { id: 4, tipoImovel: 'Casa', preco: 800000, quartos: 4, banheiros: 3, garagens: 2, ambientes: ['Closet', 'Escritório'], conveniencias: ['Armários Planejados', 'Hidromassagem'] },
    { id: 5, tipoImovel: 'Loft', preco: 300000, quartos: 0, banheiros: 1, garagens: 1, ambientes: [], conveniencias: ['Mobiliado'] },
];
// ---------------------------------------------------------

export default function Filtro() {
    const [modalVisible, setModalVisible] = useState(false);

    // ESTADO COMPLETO DOS FILTROS
    const [filtrosAtivos, setFiltrosAtivos] = useState({
        localizacao: '',
        tipoImovel: '',  
        precoMin: '',
        precoMax: '',
        quartos: 0,      
        banheiros: 0,    
        garagens: 0,     
        ambientes: [],   
        conveniencias: [], 
    });

    const [imoveisFiltrados, setImoveisFiltrados] = useState(LISTA_IMOVEIS);

    const aplicarFiltros = (novosFiltros) => {
        setFiltrosAtivos(novosFiltros);

        const listaFiltrada = LISTA_IMOVEIS.filter(imovel => {
            let passaNoFiltro = true;

            if (novosFiltros.tipoImovel && imovel.tipoImovel !== novosFiltros.tipoImovel) {
                passaNoFiltro = false;
            }

            const min = Number(novosFiltros.precoMin);
            const max = Number(novosFiltros.precoMax);

            if (min > 0 && imovel.preco < min) {
                passaNoFiltro = false;
            }

            if (max > 0 && imovel.preco > max) {
                passaNoFiltro = false;
            }

            if (novosFiltros.quartos > 0 && imovel.quartos < novosFiltros.quartos) {
                passaNoFiltro = false;
            }
            if (novosFiltros.banheiros > 0 && imovel.banheiros < novosFiltros.banheiros) {
                passaNoFiltro = false;
            }
            if (novosFiltros.garagens > 0 && imovel.garagens < novosFiltros.garagens) {
                passaNoFiltro = false;
            }

            if (novosFiltros.ambientes.length > 0) {
                const hasMatch = novosFiltros.ambientes.some(filterAmbiente => 
                    imovel.ambientes.includes(filterAmbiente)
                );
                if (!hasMatch) passaNoFiltro = false;
            }

            if (novosFiltros.conveniencias.length > 0) {
                 const hasMatch = novosFiltros.conveniencias.some(filterConv => 
                    imovel.conveniencias.includes(filterConv)
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
                        <Imovel key={imovel.id} dados={imovel} />
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