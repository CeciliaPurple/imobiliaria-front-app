import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favoritos_imoveis";

export const toggleFavorito = async (imovel, onFavoritoChange) => {
  try {
    const favoritosJSON = await AsyncStorage.getItem(FAVORITES_KEY);
    let favoritos = favoritosJSON ? JSON.parse(favoritosJSON) : [];

    const existe = favoritos.some(f => f.id === imovel.id);

    if (existe) {
      favoritos = favoritos.filter(f => f.id !== imovel.id);
    } else {
      favoritos.push(imovel);
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));

    if (onFavoritoChange && typeof onFavoritoChange === "function") {
      onFavoritoChange();
    }
  } catch (error) {
    console.error("❌ Erro ao atualizar favoritos:", error);
  }
};
