import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Topo from "../components/Topo";
import Imovel from "../components/imovel";
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalFiltros from '../components/ModalFiltros'; 

// --- DADOS DE EXEMPLO (Com todos os campos para teste) ---
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

    // 1. ESTADO COMPLETO DOS FILTROS
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

            // --- 1. FILTRO POR TIPO DE IMÓVEL (Seleção Única) ---
            if (novosFiltros.tipoImovel && imovel.tipoImovel !== novosFiltros.tipoImovel) {
                passaNoFiltro = false;
            }

            // --- 2. FILTRO POR PREÇO MÍNIMO/MÁXIMO ---
            const min = Number(novosFiltros.precoMin);
            const max = Number(novosFiltros.precoMax);

            if (min > 0 && imovel.preco < min) {
                passaNoFiltro = false;
            }
            // Verifica max se for maior que 0 (para não filtrar se estiver vazio)
            if (max > 0 && imovel.preco > max) {
                passaNoFiltro = false;
            }

            // --- 3. FILTRO POR CONTADORES (Valores Mínimos) ---
            // O imóvel DEVE ter a quantidade ou mais
            if (novosFiltros.quartos > 0 && imovel.quartos < novosFiltros.quartos) {
                passaNoFiltro = false;
            }
            if (novosFiltros.banheiros > 0 && imovel.banheiros < novosFiltros.banheiros) {
                passaNoFiltro = false;
            }
            if (novosFiltros.garagens > 0 && imovel.garagens < novosFiltros.garagens) {
                passaNoFiltro = false;
            }

            // --- 4. FILTRO POR SELEÇÃO MÚLTIPLA (Ambientes) - Lógica "OU" ---
            // O imóvel deve ter PELO MENOS UM dos ambientes selecionados
            if (novosFiltros.ambientes.length > 0) {
                const hasMatch = novosFiltros.ambientes.some(filterAmbiente => 
                    imovel.ambientes.includes(filterAmbiente)
                );
                if (!hasMatch) passaNoFiltro = false;
            }

            // --- 5. FILTRO POR SELEÇÃO MÚLTIPLA (Conveniências) - Lógica "OU" ---
            // O imóvel deve ter PELO MENOS UMA das conveniências selecionadas
            if (novosFiltros.conveniencias.length > 0) {
                 const hasMatch = novosFiltros.conveniencias.some(filterConv => 
                    imovel.conveniencias.includes(filterConv)
                );
                if (!hasMatch) passaNoFiltro = false;
            }

            // A localização não é filtrada pois o dado de exemplo não a possui.
            // Para fazê-lo, a lista de imóveis precisaria do campo 'localizacao'.
            // if (novosFiltros.localizacao && !imovel.localizacao.toLowerCase().includes(novosFiltros.localizacao.toLowerCase())) { passaNoFiltro = false; }


            return passaNoFiltro;
        });

        // Atualiza a lista exibida e fecha o modal
        setImoveisFiltrados(listaFiltrada);
        setModalVisible(false);
    };
    
    // ... (restante do componente permanece igual)
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