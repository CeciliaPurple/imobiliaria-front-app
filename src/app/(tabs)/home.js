import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import Topo from "../../components/Topo";
import Imovel from "../../components/imovel";
import ModalMensagem from "../../components/ModalMensagem";
import { checkAuth } from "../../../Store/authHelper";
import { useAuthStore } from "../../../Store/useAuthStore";

export default function Home() {
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ visible: false, title: '', message: '', onConfirm: null });

    const { profile, isLogged } = useAuthStore();

    useFocusEffect(
        useCallback(() => {
            verificarToken();
        }, [])
    );

    const verificarToken = async () => {
        const auth = await checkAuth();

        if (!auth.isAuthenticated && auth.expired) {
            setModal({
                visible: true,
                title: 'Sessão Expirada',
                message: 'Sua sessão expirou. Faça login novamente para continuar.',
                onConfirm: () => {
                    setModal({ visible: false, title: '', message: '', onConfirm: null });
                    router.replace('/login');
                }
            });
        }
    };

    useEffect(() => {
        fetchImoveis();
    }, []);

    const fetchImoveis = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:3100/imoveis');

            if (!response.ok) {
                throw new Error('Erro ao buscar imóveis');
            }

            const data = await response.json();

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
            <ModalMensagem
                visible={modal.visible}
                title={modal.title}
                message={modal.message}
                onConfirm={modal.onConfirm}
            />

            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#146FBA" />
                    <Text style={styles.loadingText}>Carregando imóveis...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>❌ {error}</Text>
                    <Text style={styles.errorSubtext}>
                        Tente novamente mais tarde
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
                            tintColor="#146FBA"
                        />
                    }
                >
                    <Topo />

                    <ImageBackground
                        source={require("../../../assets/img/banner.png")}
                        style={styles.banner}
                    />

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
                                            id: imovel.id,
                                            nome: imovel.titulo,
                                            area: imovel.metrosQuadrados?.toString() || "0",
                                            quartos: imovel.quartos?.toString() || "0",
                                            banheiros: imovel.banheiros?.toString() || "0",
                                            vagas: imovel.garagens?.toString() || "0",
                                            preco: imovel.valor || 0,
                                            imagem: imovel.fotoPrincipal || require("../../../assets/img/luxo.jpg"),
                                            favorito: imovel.favorito || false
                                        }}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.emptyText}>Nenhum imóvel em destaque</Text>
                        )}
                    </View>

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
                                            id: imovel.id,
                                            nome: imovel.titulo,
                                            area: imovel.metrosQuadrados?.toString() || "0",
                                            quartos: imovel.quartos?.toString() || "0",
                                            banheiros: imovel.banheiros?.toString() || "0",
                                            vagas: imovel.garagens?.toString() || "0",
                                            preco: imovel.valor || 0,
                                            imagem: imovel.fotoPrincipal || require("../../../assets/img/luxo.jpg"),
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
