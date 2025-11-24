import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMensagem from "../../components/ModalMensagem";
import Topo from "../../components/Topo";

const FAVORITES_KEY = 'favoritos'; // Mesma chave usada em todos os componentes

export default function Imovel() {
    const { id } = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imovel, setImovel] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const [loadingFavorito, setLoadingFavorito] = useState(false);
    const [modal, setModal] = useState({ visible: false, title: '', message: '' });

    // Carregar imóvel da API
    useEffect(() => {
        const buscarImovel = async () => {
            try {
                const response = await fetch(`http://localhost:3100/imoveis/${id}`);

                if (!response.ok) {
                    throw new Error('Imóvel não encontrado');
                }

                const data = await response.json();


                setImovel(data.imovel || data);
                setLoading(false);
            } catch (error) {
                console.error('❌ Erro ao buscar imóvel:', error);
                setError('Erro ao carregar imóvel');
                setLoading(false);
            }
        };

        if (id) {
            buscarImovel();
        }
    }, [id]);

    // Verificar se o imóvel está nos favoritos
    useEffect(() => {
        const verificarFavorito = async () => {
            try {
                const favoritosJSON = await AsyncStorage.getItem(FAVORITES_KEY);
                const favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];

                // Verifica se o ID do imóvel está na lista (comparando o ID)
                const isFavorito = favoritos.some(fav => {
                    // Se for um objeto, compara o ID
                    if (typeof fav === 'object' && fav.id) {
                        return String(fav.id) === String(id);
                    }
                    // Se for apenas o ID (string/number)
                    return String(fav) === String(id);
                });

                setFavorito(isFavorito);

            } catch (error) {
                console.error('Erro ao verificar favoritos:', error);
            }
        };

        if (id) {
            verificarFavorito();
        }
    }, [id]);

    // Toggle favorito
    const toggleFavorito = async () => {
        if (!imovel) return;

        try {
            setLoadingFavorito(true);

            const favoritosJSON = await AsyncStorage.getItem(FAVORITES_KEY);
            let favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];

            if (favorito) {
                // Remover dos favoritos
                favoritos = favoritos.filter(fav => {
                    if (typeof fav === 'object' && fav.id) {
                        return String(fav.id) !== String(id);
                    }
                    return String(fav) !== String(id);
                });

                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
                setFavorito(false);



                setModal({
                    visible: true,
                    title: 'Removido dos Favoritos',
                    message: 'Este imóvel foi removido da sua lista de favoritos.'
                });
            } else {
                // Adicionar aos favoritos - salva o objeto completo
                const imovelFavorito = {
                    id: imovel.id,
                    nome: imovel.titulo,
                    preco: imovel.valor,
                    imagem: imovel.foto,
                    area: imovel.metrosQuadrados,
                    quartos: imovel.quartos,
                    banheiros: imovel.banheiros,
                    vagas: imovel.garagens
                };

                favoritos.push(imovelFavorito);
                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
                setFavorito(true);



                setModal({
                    visible: true,
                    title: 'Adicionado aos Favoritos',
                    message: 'Este imóvel foi adicionado à sua lista de favoritos!'
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar favoritos:', error);
            setModal({
                visible: true,
                title: 'Erro',
                message: 'Não foi possível atualizar os favoritos.'
            });
        } finally {
            setLoadingFavorito(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#146FBA" />
                <Text style={{ marginTop: 10, color: '#375A76' }}>Carregando imóvel...</Text>
            </View>
        );
    }

    if (error || !imovel) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Text style={{ color: '#375A76', fontSize: 18, marginBottom: 20 }}>
                    {error || 'Imóvel não encontrado'}
                </Text>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Voltar para Home</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        );
    }

    // Processar arrays de ambiente e conveniências
    const ambientes = imovel.ambiente ? imovel.ambiente.split(',').map(a => a.trim()) : [];
    const conveniencias = imovel.conveniencias ? imovel.conveniencias.split(',').map(c => c.trim()) : [];

    // Formatar valores
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(imovel.valor);

    const iptuFormatado = imovel.iptu ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(imovel.iptu) : 'Não informado';

    return (
        <View style={styles.container}>
            <ModalMensagem
                visible={modal.visible}
                title={modal.title}
                message={modal.message}
                onConfirm={() => setModal({ visible: false, title: '', message: '' })}
            />

            <ScrollView>
                <Topo/>
                {/* Imagem do imóvel */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imovel.foto }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                        style={styles.gradientOverlay}
                        locations={[0.6, 1]}
                    />
                    <View style={styles.overlay}>
                        <TouchableOpacity
                            onPress={toggleFavorito}
                            disabled={loadingFavorito}
                            style={styles.favoritoButton}
                        >
                            {loadingFavorito ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Ionicons
                                    name={favorito ? "heart" : "heart-outline"}
                                    size={32}
                                    color={favorito ? "#FF4444" : "#fff"}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Título */}
                <Text style={styles.titulo}>{imovel.titulo}</Text>

                {/* Localização */}
                <View style={styles.location}>
                    <EvilIcons name="location" size={32} color="#375A76" />
                    <Text style={styles.text_location}>{imovel.localizacao}</Text>
                </View>

                {/* Card de Preços */}
                <View style={styles.container_price}>
                    <View style={styles.price}>
                        <Text style={styles.bold}>Valor Venda</Text>
                        <Text style={styles.bold}>{valorFormatado}</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.light}>Valor IPTU</Text>
                        <Text style={styles.light}>{iptuFormatado}</Text>
                    </View>

                    {/* Botões */}
                    <View style={styles.container_btn}>
                        <Link href={`/agendamento?imovel=${id}`} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Agendar Visita</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

                {/* Características do imóvel */}
                <View style={styles.container_info}>
                    <View style={styles.infoItem}>
                        <Ionicons name="home-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>{imovel.metrosQuadrados}m²</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="bed-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>{imovel.quartos} Quartos</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="water-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>{imovel.banheiros} Banheiros</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="car-outline" size={32} color="#375A76" />
                        <Text style={styles.infoText}>{imovel.garagens} Vagas</Text>
                    </View>
                </View>

                {/* Ambientes e Conveniências */}
                <View style={styles.container_room}>
                    {ambientes.length > 0 && (
                        <>
                            <Text style={styles.bold}>Ambientes</Text>
                            <View style={styles.container_card}>
                                {ambientes.map((ambiente, index) => (
                                    <Text key={index} style={styles.text_card}>{ambiente}</Text>
                                ))}
                            </View>
                        </>
                    )}

                    {conveniencias.length > 0 && (
                        <>
                            <Text style={styles.bold}>Conveniências</Text>
                            <View style={styles.container_card}>
                                {conveniencias.map((conveniencia, index) => (
                                    <Text key={index} style={styles.text_card}>{conveniencia}</Text>
                                ))}
                            </View>
                        </>
                    )}

                    {/* Descrição */}
                    {imovel.descricao && (
                        <>
                            <Text style={styles.bold}>Descrição</Text>
                            <Text style={styles.description}>{imovel.descricao}</Text>
                        </>
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
    imageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    favoritoButton: {
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 50,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 20,
        color: "#375A76",
    },
    location: {
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    text_location: {
        fontSize: 16,
        color: "#375A76",
        fontWeight: "500",
    },
    container_price: {
        backgroundColor: '#E3F2FF',
        width: '80%',
        gap: 20,
        padding: 20,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignSelf: 'center',
        marginTop: 40,
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bold: {
        fontSize: 20,
        fontWeight: "700",
        color: "#375A76",
        marginBottom: 10,
    },
    light: {
        fontSize: 16,
        color: "#375A76",
    },
    container_btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        backgroundColor: '#146FBA',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: "700",
        color: '#F5F5F5',
    },
    container_info: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
        alignSelf: 'center',
        gap: 40,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center", // ✔ ícone e texto ficam alinhados verticalmente
        gap: 10,
    },

    infoText: {
        fontSize: 16,
        color: '#375A76',
    },
    container_room: {
        gap: 20,
        padding: 40,
    },
    container_card: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#E3F2FF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        padding: 10,
        gap: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20,
    },
    text_card: {
        padding: 10,
        color: '#146FBA',
        fontSize: 16,
        fontWeight: "500",
        backgroundColor: '#E3F2FF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#375A76',
        lineHeight: 24,
    },
});