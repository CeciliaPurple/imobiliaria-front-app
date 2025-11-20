import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Topo from "../../components/Topo";
import VisitaImovel from "../../components/VisitaImovel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Visitas() {
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        carregarVisitas();
    }, []);

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
            setVisitas(data.agendamentos ?? data);
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
            <Topo />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Minhas Visitas</Text>

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

                                // 🔥 Dispara quando a visita é cancelada
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

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
