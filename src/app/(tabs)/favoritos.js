import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Topo from "../../components/Topo";
import Imovel from "../../components/imovel";

const FAVORITOS_KEY = "favoritos"; // Mesma chave usada no componente Imovel

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarFavoritos = async () => {
    try {
      setLoading(true);
      const favoritosString = await AsyncStorage.getItem(FAVORITOS_KEY);
      const favoritosData = favoritosString ? JSON.parse(favoritosString) : [];
      setFavoritos(favoritosData);
    } catch (error) {
      console.error('❌ Erro ao carregar favoritos:', error);
      setFavoritos([]);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  // Carrega na primeira renderização
  useEffect(() => {
    carregarFavoritos();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Topo />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#146FBA" />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Topo />
      <ScrollView>
        <Text style={styles.title}>Favoritos</Text>

        {favoritos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Você ainda não possui favoritos</Text>
            <Text style={styles.emptySubtext}>Adicione imóveis aos favoritos clicando no ❤️</Text>
          </View>
        ) : (
          <View style={styles.container_imovel}>
            {favoritos.map((imovel) => (
              <Imovel 
                key={imovel.id} 
                data={imovel} 
                onFavoritoChange={carregarFavoritos} 
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5" 
  },
  title: { 
    width: '100%', 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#146FBA', 
    backgroundColor: '#E3F2FF', 
    padding: 10, 
    textAlign: 'center', 
    borderWidth: 2, 
    borderColor: '#fff', 
    marginTop: 10, 
    marginBottom: 20 
  },
  container_imovel: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 15, 
    marginBottom: 60 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 16, 
    color: '#375A76' 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 40, 
    marginTop: 100 
  },
  emptyText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#375A76', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  emptySubtext: { 
    fontSize: 14, 
    color: '#6C757D', 
    textAlign: 'center' 
  },
});