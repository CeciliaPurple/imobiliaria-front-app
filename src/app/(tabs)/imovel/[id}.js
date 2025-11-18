// Arquivo: src/app/imovel/[id].js
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import Topo from "../../../components/Topo";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link, useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImovelDetalhes() {
    const { id } = useLocalSearchParams();
    const [imovel, setImovel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        const fetchImovel = async () => {
            // Verifica se o ID existe
            if (!id) {
                console.log('❌ ID não fornecido');
                setError('ID do imóvel não fornecido');
                setLoading(false);
                return;
            }

            console.log('🔍 Buscando imóvel com ID:', id);

            try {
                const response = await fetch(`http://localhost:3100/imoveis/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Imóvel encontrado:', data);
                    setImovel(data.imovel || data);
                    
                    // Verifica se o imóvel já está nos favoritos
                    const favoritosString = await AsyncStorage.getItem('favoritos');
                    const favoritos = favoritosString ? JSON.parse(favoritosString) : [];
                    const jaEhFavorito = favoritos.some(fav => String(fav.id) === String(id));
                    setFavorito(jaEhFavorito);

                    setLoading(false);
                } else {
                    console.log('❌ Erro na resposta:', response.status);
                    setError('Imóvel não encontrado');
                    setLoading(false);
                }
            } catch (error) {
                console.error('❌ Erro ao buscar imóvel:', error);
                setError('Erro ao carregar imóvel');
                setLoading(false);
            }
        };

        fetchImovel();
    }, [id]);

    const handleToggleFavorite = async () => {
        if (!imovel) return;

        const favoritosString = await AsyncStorage.getItem('favoritos');
        const favoritosAtuais = favoritosString ? JSON.parse(favoritosString) : [];
        const imovelIndex = favoritosAtuais.findIndex(fav => String(fav.id) === String(imovel.id));

        let novosFavoritos;

        if (imovelIndex > -1) {
            // Remove dos favoritos
            novosFavoritos = favoritosAtuais.filter(fav => String(fav.id) !== String(imovel.id));
            setFavorito(false);
            console.log('✅ Removido dos favoritos');
        } else {
            // Adiciona aos favoritos
            const imovelParaAdicionar = {
                id: imovel.id,
                foto: imovel.foto,
                titulo: imovel.titulo,
                metrosQuadrados: imovel.metrosQuadrados,
                quartos: imovel.quartos,
                banheiros: imovel.banheiros,
                garagens: imovel.garagens,
                localizacao: imovel.localizacao,
                cidade: imovel.cidade || '',
                valor: imovel.valor
            };
            
            novosFavoritos = [...favoritosAtuais, imovelParaAdicionar];
            setFavorito(true);
            console.log('✅ Adicionado aos favoritos');
        }

        await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    };

    const salvarUltimoImovel = async () => {
        if (imovel) {
            await AsyncStorage.setItem("ultimoImovel", JSON.stringify({
                id: imovel.id,
                foto: imovel.foto,
                titulo: imovel.titulo,
                localizacao: imovel.localizacao,
                valor: imovel.valor,
                metrosQuadrados: imovel.metrosQuadrados,
                quartos: imovel.quartos,
                banheiros: imovel.banheiros,
                garagens: imovel.garagens
            }));
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Topo />
                <ActivityIndicator size="large" color="#146FBA" />
                <Text style={styles.loadingText}>Carregando imóvel...</Text>
            </View>
        );
    }

    if (error || !imovel) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Topo />
                <Text style={styles.errorText}>{error || 'Imóvel não encontrado'}</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Processar arrays de ambiente e conveniências
    const ambientes = imovel.ambiente ? imovel.ambiente.split(',').map(a => a.trim()) : [];
    const conveniencias = imovel.conveniencias ? imovel.conveniencias.split(',').map(c => c.trim()) : [];

    // Formatar valores
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(imovel.valor);

    const iptuFormatado = imovel.iptu ? new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(imovel.iptu) : 'Não informado';

    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <ImageBackground
                    source={{ uri: imovel.foto }}
                    style={styles.img}
                >
                    {/* Gradiente escuro embaixo */}
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                        style={styles.gradientOverlay}
                        locations={[0.6, 1]}
                    />
                    {/* Coração de favorito */}
                    <View style={styles.overlay}>
                        <TouchableOpacity onPress={handleToggleFavorite}>
                            <Ionicons 
                                name={favorito ? "heart" : "heart-outline"} 
                                size={32} 
                                color={favorito ? "#DE302A" : "#fff"} 
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <Text style={styles.titulo}>{imovel.titulo}</Text>

                <View style={styles.location}>
                    <EvilIcons name="location" size={32} color="#375A76" />
                    <Text style={styles.text_location}>{imovel.localizacao}</Text>
                </View>

                <View style={styles.container_price}>
                    <View style={styles.price}>
                        <Text style={styles.bold}>Valor Venda</Text>
                        <Text style={styles.bold}>R$ {valorFormatado}</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.light}>Valor IPTU</Text>
                        <Text style={styles.light}>R$ {iptuFormatado}</Text>
                    </View>

                    <View style={styles.container_btn}>
                        <Link href={`/agenda?imovel=${id}`} asChild>
                            <TouchableOpacity style={styles.button} onPress={salvarUltimoImovel}>
                                <Text style={styles.buttonText}>Agendar Visita</Text>
                            </TouchableOpacity>
                        </Link>
                        <Link href={'/'} asChild>
                            <TouchableOpacity style={styles.button2}>
                                <Text style={styles.buttonText2}>Contato</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

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

                {/* Ambientes */}
                {ambientes.length > 0 && (
                    <View style={styles.container_room}>
                        <Text style={styles.bold}>Ambientes</Text>
                        <View style={styles.container_card}>
                            {ambientes.map((ambiente, index) => (
                                <Text key={index} style={styles.text_card}>{ambiente}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Conveniências */}
                {conveniencias.length > 0 && (
                    <View style={styles.container_room}>
                        <Text style={styles.bold}>Conveniências</Text>
                        <View style={styles.container_card}>
                            {conveniencias.map((conveniencia, index) => (
                                <Text key={index} style={styles.text_card}>{conveniencia}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Descrição */}
                {imovel.descricao && (
                    <View style={styles.container_room}>
                        <Text style={styles.bold}>Descrição</Text>
                        <Text style={styles.description}>{imovel.descricao}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    loadingText: {
        fontSize: 16,
        color: "#375A76",
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: "#DE302A",
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    img: {
        width: '100%',
        height: 300
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
        gap: 10,
    },
    button: {
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
    button2: {
        backgroundColor: '#F5F5F5',
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
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: "700",
        color: '#F5F5F5',
    },
    buttonText2: {
        fontSize: 12,
        fontWeight: "700",
        color: '#375A76',
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
        alignItems: "flex-end",
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