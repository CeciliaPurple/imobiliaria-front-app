import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITOS_KEY = "favoritos"; // Chave única para todos os componentes

export default function Imovel({ data, onFavoritoChange }) {
  const [favorito, setFavorito] = useState(false);

  // Verifica se está nos favoritos ao carregar
  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const favoritosJSON = await AsyncStorage.getItem(FAVORITOS_KEY);
        const favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];
        setFavorito(favoritos.some(f => f.id === data?.id));
      } catch (error) {
        console.error('Erro ao verificar favorito:', error);
      }
    };

    if (data?.id) checkFavorito();
  }, [data?.id]);

  // Toggle favorito
  const handleToggleFavorite = async () => {
    if (!data?.id) return;

    try {
      const favoritosJSON = await AsyncStorage.getItem(FAVORITOS_KEY);
      let favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];

      const index = favoritos.findIndex(f => f.id === data.id);

      if (index !== -1) {
        // Remove dos favoritos
        favoritos.splice(index, 1);
        setFavorito(false);
      } else {
        // Adiciona aos favoritos
        favoritos.push(data);
        setFavorito(true);
      }

      // Salva no AsyncStorage
      await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));

      // Notifica o componente pai
      if (onFavoritoChange) onFavoritoChange();
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
    }
  };

  // Formatar preço
  const precoFormatado = data?.preco
    ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.preco)
    : "00.000,00";

  return (
    <View style={styles.card}>
      {/* Imagem + overlay */}
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={typeof data?.imagem === 'string' ? { uri: data.imagem } : data?.imagem || require("../../assets/img/luxo.jpg")}
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradientOverlay}
        />

        {/* Nome + coração */}
        <View style={styles.overlay}>
          <Text style={styles.name} numberOfLines={1}>
            {data?.nome || "Nome do Imóvel"}
          </Text>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoritoButton}>
            <Ionicons
              name={favorito ? "heart" : "heart-outline"}
              size={24}
              color={favorito ? "#FF4444" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Infos do imóvel */}
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Ionicons name="home-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>{data?.area || "000"}m²</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="bed-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>{data?.quartos || "0"}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="water-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>{data?.banheiros || "0"}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="car-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>{data?.vagas || "0"}</Text>
        </View>
      </View>

      {/* Preço + botão */}
      <View style={styles.footer}>
        <Text style={styles.price}>R$ {precoFormatado}</Text>
        <Link href={`/(tabs)/imovel/${data?.id}`} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver mais</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imgContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  favoritoButton: {
    padding: 4,
  },
  info: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4EBF1",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 4,
    color: "#375A76",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#375A76",
  },
  button: {
    backgroundColor: "#146FBA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});