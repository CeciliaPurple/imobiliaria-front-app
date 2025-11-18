import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    ScrollView, 
    ActivityIndicator, 
    RefreshControl 
} from "react-native";
import React, { useState, useEffect } from 'react';
import Topo from "../../components/Topo";
import Imovel from "../../components/imovel";

export default function Home() {
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImoveis();
    }, []);

    const fetchImoveis = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🏠 Buscando imóveis do backend...');
            
            const response = await fetch('http://localhost:3100/imoveis');
            
            console.log('📡 Status da resposta:', response.status);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar imóveis');
            }
            
            const data = await response.json();
            console.log('✅ Imóveis recebidos:', data);
            
            setImoveis(data);
        } catch (error) {
            console.error('❌ Erro ao buscar imóveis:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchImoveis();
        setRefreshing(false);
    };

    const listaImoveis = Array.isArray(imoveis.imovel) ? imoveis.imovel : imoveis;

    const imoveisDestaque = Array.isArray(listaImoveis)
        ? listaImoveis.filter((item) => item.destaque === true)
        : [];

    const imoveisLancamentos = Array.isArray(listaImoveis)
        ? listaImoveis.filter((item) => item.lancamento === true)
        : [];

    return (
        <View style={styles.container}>
            <Topo />
            
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#146FBA" />
                    <Text style={styles.loadingText}>Carregando imóveis...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>❌ {error}</Text>
                    <Text style={styles.errorSubtext}>
                        Verifique se o backend está rodando
                    </Text>
                </View>
            ) : (
                <ScrollView 
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#146FBA"]}
                        />
                    }
                >
                    <ImageBackground
                        source={require("../../../assets/img/banner.png")}
                        style={styles.banner}
                    />

                    {/* Destaques */}
                    <View style={styles.container_destaque}>
                        <Text style={styles.title}>Destaques</Text>
                        
                        {imoveisDestaque.length > 0 ? (
                            <ScrollView
                                horizontal
                                contentContainerStyle={styles.listaImoveis}
                                showsHorizontalScrollIndicator={false}
                            >
                                {imoveisDestaque.map((imovel) => (
                                    <Imovel 
                                        key={imovel.id}
                                        data={{
                                            id: imovel.id, // ✅ ADICIONADO!
                                            nome: imovel.titulo,
                                            area: imovel.metrosQuadrados?.toString() || "0",
                                            quartos: imovel.quartos?.toString() || "0",
                                            banheiros: imovel.banheiros?.toString() || "0",
                                            vagas: imovel.garagens?.toString() || "0",
                                            preco: imovel.valor || 0, // Sem formatação aqui
                                            imagem: imovel.foto || require("../../../assets/img/luxo.jpg"),
                                            favorito: imovel.favorito || false
                                        }}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.emptyText}>Nenhum imóvel em destaque</Text>
                        )}
                    </View>

                    {/* Lançamentos */}
                    <View style={styles.container_destaque}>
                        <Text style={styles.title}>Lançamentos</Text>
                        
                        {imoveisLancamentos.length > 0 ? (
                            <ScrollView
                                horizontal
                                contentContainerStyle={styles.listaImoveis}
                                showsHorizontalScrollIndicator={false}
                            >
                                {imoveisLancamentos.map((imovel) => (
                                    <Imovel 
                                        key={imovel.id}
                                        data={{
                                            id: imovel.id, // ✅ ADICIONADO!
                                            nome: imovel.titulo,
                                            area: imovel.metrosQuadrados?.toString() || "0",
                                            quartos: imovel.quartos?.toString() || "0",
                                            banheiros: imovel.banheiros?.toString() || "0",
                                            vagas: imovel.garagens?.toString() || "0",
                                            preco: imovel.valor || 0, // Sem formatação aqui
                                            imagem: imovel.foto || require("../../../assets/img/luxo.jpg"),
                                            favorito: imovel.favorito || false
                                        }}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.emptyText}>Nenhum lançamento disponível</Text>
                        )}
                    </View>

                    {listaImoveis.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>🏠 Nenhum imóvel encontrado</Text>
                            <Text style={styles.emptySubtext}>
                                Adicione imóveis no backend para vê-los aqui
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    banner: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    container_destaque: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: 20,
        gap: 10,
        marginBottom: 20,
    },
    listaImoveis: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 10,
        color: '#375A76',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#375A76',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#DC3545',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorSubtext: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 10,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 10,
        fontStyle: 'italic',
    },
});