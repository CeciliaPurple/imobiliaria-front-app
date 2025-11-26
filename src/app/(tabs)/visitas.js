import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Topo from "../../components/Topo";
import VisitaImovel from "../../components/VisitaImovel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Visitas() {
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ultimoImovel, setUltimoImovel] = useState(null);

    useEffect(() => {
        carregarVisitas();
        carregarUltimoImovel();
    }, []);

    const carregarUltimoImovel = async () => {
        try {
            const user = await AsyncStorage.getItem("userData");
            if (!user) return;

            const userObj = JSON.parse(user);
            const chave = `ultimoImovel_${userObj.id}`;
            const chaveExibicao = `ultimoImovelExibido_${userObj.id}`;

            const jaExibiu = await AsyncStorage.getItem(chaveExibicao);
            const salvo = await AsyncStorage.getItem(chave);

            // ❗ Só mostrar uma vez quando logar
            if (!jaExibiu && salvo) {
                setUltimoImovel(JSON.parse(salvo));
                await AsyncStorage.setItem(chaveExibicao, "true");
            }
        } catch (err) {
            console.log("Erro ao carregar último imóvel:", err);
        }
    };

    const carregarVisitas = async () => {
        try {
            const user = await AsyncStorage.getItem("userData");
            const token = await AsyncStorage.getItem("userToken");

            if (!user || !token) {
                setError("Você precisa estar logado.");
                setLoading(false);
                return;
            }

            const userObj = JSON.parse(user);

            const response = await fetch(
                `http://localhost:3100/agenda/usuario/${userObj.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao carregar visitas");
            }

            const data = await response.json();
            const lista = data.agendamentos ?? data;

            // 🔥 PRIORIDADE: pendentes primeiro
            const pendentes = lista.filter(v => v.status === "pendente");
            const outros = lista.filter(v => v.status !== "pendente");

            const organizado = [...pendentes, ...outros];

            // 🔥 LIMITA A 4 VISITAS
            setVisitas(organizado.slice(0, 4));

        } catch (e) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 REMOVE A VISITA DA LISTA DEPOIS DE CANCELADA
    const removerDaLista = (id) => {
        setVisitas(prev => prev.filter(item => item.id !== id));
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#146FBA" />
                <Text style={{ marginTop: 10, color: "#375A76" }}>
                    Carregando visitas...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Topo />

                <Text style={styles.title}>Minhas Visitas</Text>

                {/* 🔥 MOSTRAR ÚLTIMO IMÓVEL VISTO (apenas 1 vez) */}
                {ultimoImovel && (
                    <View style={styles.lastCard}>
                        <Text style={styles.lastTitle}>Último imóvel visualizado</Text>

                        <VisitaImovel visita={ultimoImovel} onCancel={() => {}} />
                    </View>
                )}

                <View style={styles.container_visita}>
                    {visitas.length === 0 ? (
                        <Text style={{ color: "#666", marginTop: 20 }}>
                            Você não possui visitas agendadas.
                        </Text>
                    ) : (
                        visitas.map(visita => (
                            <VisitaImovel
                                key={visita.id}
                                visita={visita}
                                onCancel={() => removerDaLista(visita.id)}
                            />
                        ))
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

    title: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        color: "#146FBA",
        backgroundColor: "#E3F2FF",
        padding: 10,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: "#fff",
    },

    container_visita: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 60,
    },

    lastCard: {
        padding: 10,
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },

    lastTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#375A76",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
