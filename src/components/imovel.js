import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Imovel() {
  return (
    <View style={styles.card}>
      {/* Imagem + overlay */}
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../../assets/img/luxo.jpg")}
        />

        {/* Gradiente escuro embaixo */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradientOverlay}
        />

        {/* Nome + coração */}
        <View style={styles.overlay}>
          <Text style={styles.name}>Nome</Text>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </View>
      </View>

      {/* Infos do imóvel */}
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Ionicons name="home-outline" size={16} color="#555" />
          <Text style={styles.infoText}>000m²</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="bed-outline" size={16} color="#555" />
          <Text style={styles.infoText}>0</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="water-outline" size={16} color="#555" />
          <Text style={styles.infoText}>0</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="car-outline" size={16} color="#555" />
          <Text style={styles.infoText}>0</Text>
        </View>
      </View>

      {/* Preço + botão */}
      <View style={styles.footer}>
        <Text style={styles.price}>R$00000,00</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    left:60,
    top:30,
    width: 320,
    borderRadius: 12,
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
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 4,
    color: "#555",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
