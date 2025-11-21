import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import Topo from "../../components/Topo";
import Imovel from "../../components/imovel";
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalFiltros from '../../components/ModalFiltros';

export default function Filtro() {
    const [modalVisible, setModalVisible] = useState(false);
    const [imoveis, setImoveis] = useState([]);
    const [imoveisFiltrados, setImoveisFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Estados dos filtros - mesma estrutura do web
    const [filtros, setFiltros] = useState({
        localizacao: '',
        tipos: [],
        precoMin: '',
        precoMax: '',
        quartos: [],
        banheiros: [],
        vagas: [],
        ambientes: [],
        conveniencias: []
    });

    // Buscar imóveis ao carregar
    useEffect(() => {
        buscarImoveis();
    }, []);

    const buscarImoveis = async () => {
        try {
            console.log('🔄 Carregando imóveis da API...');
            setLoading(true);

            const response = await fetch('http://localhost:3100/imoveis');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar imóveis');
            }

            const data = await response.json();
            const imoveisData = data.imovel || [];

            console.log('✅ Imóveis carregados:', imoveisData.length);
            
            setImoveis(imoveisData);
            setImoveisFiltrados(imoveisData);
        } catch (error) {
            console.error('❌ Erro ao carregar imóveis:', error);
            setImoveis([]);
            setImoveisFiltrados([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Função para atualizar (pull to refresh)
    const onRefresh = () => {
        setRefreshing(true);
        buscarImoveis();
    };

    // Aplicar filtros sempre que mudarem - MESMA LÓGICA DO WEB
    useEffect(() => {
        let resultado = [...imoveis];

        console.log('🔍 Aplicando filtros:', {
            localizacao: filtros.localizacao || 'nenhuma',
            tipos: filtros.tipos.length,
            precoMin: filtros.precoMin || 'sem mínimo',
            precoMax: filtros.precoMax || 'sem máximo',
            quartos: filtros.quartos.length,
            banheiros: filtros.banheiros.length,
            vagas: filtros.vagas.length,
            ambientes: filtros.ambientes.length,
            conveniencias: filtros.conveniencias.length
        });

        // Filtro de localização (busca em titulo e localizacao)
        if (filtros.localizacao.trim()) {
            const busca = filtros.localizacao.toLowerCase();
            resultado = resultado.filter(imovel =>
                imovel.localizacao?.toLowerCase().includes(busca) ||
                imovel.titulo?.toLowerCase().includes(busca)
            );
        }

        // Filtro de tipo (baseado no título)
        if (filtros.tipos.length > 0) {
            resultado = resultado.filter(imovel => {
                const tituloLower = imovel.titulo?.toLowerCase() || '';
                return filtros.tipos.some(tipo =>
                    tituloLower.includes(tipo.toLowerCase())
                );
            });
        }

        // Filtro de preço mínimo
        if (filtros.precoMin) {
            resultado = resultado.filter(imovel =>
                parseFloat(imovel.valor) >= parseFloat(filtros.precoMin)
            );
        }

        // Filtro de preço máximo
        if (filtros.precoMax) {
            resultado = resultado.filter(imovel =>
                parseFloat(imovel.valor) <= parseFloat(filtros.precoMax)
            );
        }

        // Filtro de quartos (mínimo selecionado)
        if (filtros.quartos.length > 0) {
            const minQuartos = Math.min(...filtros.quartos);
            resultado = resultado.filter(imovel =>
                parseInt(imovel.quartos) >= minQuartos
            );
        }

        // Filtro de banheiros (mínimo selecionado)
        if (filtros.banheiros.length > 0) {
            const minBanheiros = Math.min(...filtros.banheiros);
            resultado = resultado.filter(imovel =>
                parseInt(imovel.banheiros) >= minBanheiros
            );
        }

        // Filtro de vagas (mínimo selecionado)
        if (filtros.vagas.length > 0) {
            const minVagas = Math.min(...filtros.vagas);
            resultado = resultado.filter(imovel =>
                parseInt(imovel.garagens) >= minVagas
            );
        }

        // Filtro de ambientes
        if (filtros.ambientes.length > 0) {
            resultado = resultado.filter(imovel => {
                const ambienteImovel = imovel.ambiente?.toLowerCase() || '';
                return filtros.ambientes.some(amb =>
                    ambienteImovel.includes(amb.toLowerCase())
                );
            });
        }

        // Filtro de conveniências
        if (filtros.conveniencias.length > 0) {
            resultado = resultado.filter(imovel => {
                const convenienciasImovel = imovel.conveniencias?.toLowerCase() || '';
                return filtros.conveniencias.some(conv =>
                    convenienciasImovel.includes(conv.toLowerCase())
                );
            });
        }

        console.log('✅ Filtros aplicados. Imóveis encontrados:', resultado.length);
        setImoveisFiltrados(resultado);
    }, [filtros, imoveis]);

    const aplicarFiltros = (novosFiltros) => {
        console.log('📋 Novos filtros recebidos:', novosFiltros);
        setFiltros(novosFiltros);
        setModalVisible(false);
    };

    const limparFiltros = () => {
        console.log('🗑️ Limpando filtros...');
        const filtrosVazios = {
            localizacao: '',
            tipos: [],
            precoMin: '',
            precoMax: '',
            quartos: [],
            banheiros: [],
            vagas: [],
            ambientes: [],
            conveniencias: []
        };
        
        setFiltros(filtrosVazios);
    };

    // Verificar se há filtros ativos
    const hasFiltrosAtivos = () => {
        return filtros.localizacao || 
               filtros.tipos.length > 0 || 
               filtros.precoMin || 
               filtros.precoMax || 
               filtros.quartos.length > 0 || 
               filtros.banheiros.length > 0 || 
               filtros.vagas.length > 0 ||
               filtros.ambientes.length > 0 ||
               filtros.conveniencias.length > 0;
    };

    // Contar quantos filtros estão ativos
    const contarFiltrosAtivos = () => {
        let count = 0;
        if (filtros.localizacao) count++;
        if (filtros.tipos.length > 0) count++;
        if (filtros.precoMin || filtros.precoMax) count++;
        if (filtros.quartos.length > 0) count++;
        if (filtros.banheiros.length > 0) count++;
        if (filtros.vagas.length > 0) count++;
        if (filtros.ambientes.length > 0) count++;
        if (filtros.conveniencias.length > 0) count++;
        return count;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Topo />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#146FBA" />
                    <Text style={styles.loadingText}>Carregando imóveis...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Topo />
            
            <ModalFiltros 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                onApply={aplicarFiltros}
                filtrosIniciais={filtros}
            />

            <ScrollView 
                style={styles.container_scroll}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#146FBA']}
                    />
                }
            >
                <View style={styles.container_filter}>
                    <TouchableOpacity 
                        style={styles.btn_filter} 
                        onPress={() => setModalVisible(true)} 
                        activeOpacity={0.8}
                    >
                        <Ionicons name="filter" size={24} color="white" />
                        <Text style={styles.text}>Filtros</Text>
                        {contarFiltrosAtivos() > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{contarFiltrosAtivos()}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    {/* Exibe quantos imóveis foram encontrados */}
                    <Text style={styles.resultText}>
                        {imoveisFiltrados.length} {imoveisFiltrados.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                    </Text>

                    {/* Mostrar filtros ativos */}
                    {hasFiltrosAtivos() && (
                        <TouchableOpacity 
                            style={styles.limparFiltros}
                            onPress={limparFiltros}
                        >
                            <Text style={styles.limparFiltrosText}>Limpar todos os filtros</Text>
                            <Ionicons name="close-circle" size={18} color="#DE302A" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.container_imovel}>
                    {imoveisFiltrados.length > 0 ? (
                        imoveisFiltrados.map((imovel) => (
                            <Imovel 
                                key={imovel.id} 
                                data={{
                                    id: imovel.id,
                                    nome: imovel.titulo,
                                    area: imovel.metrosQuadrados,
                                    quartos: imovel.quartos,
                                    banheiros: imovel.banheiros,
                                    vagas: imovel.garagens,
                                    preco: imovel.valor,
                                    imagem: imovel.foto
                                }}
                            />
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Ionicons name="search-outline" size={64} color="#ccc" />
                            <Text style={styles.noResults}>Nenhum imóvel encontrado</Text>
                            <Text style={styles.noResultsSubtext}>
                                {hasFiltrosAtivos() 
                                    ? 'Tente ajustar os filtros para encontrar mais opções'
                                    : 'Não há imóveis cadastrados no momento'
                                }
                            </Text>
                            {hasFiltrosAtivos() && (
                                <TouchableOpacity 
                                    style={styles.btnLimpar}
                                    onPress={limparFiltros}
                                >
                                    <Text style={styles.btnLimparText}>Limpar filtros</Text>
                                </TouchableOpacity>
                            )}
                        </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#375A76',
    },
    container_scroll: {
        flex: 1,
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
        paddingVertical: 8,
        backgroundColor: '#146fba',
        borderRadius: 10,
        gap: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        position: 'relative',
    },
    badge: {
        backgroundColor: '#DE302A',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    resultText: {
        marginTop: 10,
        fontSize: 14,
        color: '#375A76',
        fontWeight: '500',
    },
    limparFiltros: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    limparFiltrosText: {
        color: '#DE302A',
        fontSize: 14,
        fontWeight: '600',
    },
    container_imovel: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 60,
        paddingHorizontal: 10,
    },
    noResultsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 50,
    },
    noResults: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#375A76',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    noResultsSubtext: {
        fontSize: 14,
        color: '#6C757D',
        textAlign: 'center',
        marginBottom: 20,
    },
    btnLimpar: {
        backgroundColor: '#146FBA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    btnLimparText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});