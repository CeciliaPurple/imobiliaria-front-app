import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

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
          <Ionicons name="home-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>000m²</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="bed-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>0</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="water-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>0</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="car-outline" size={16} color="#375A76" />
          <Text style={styles.infoText}>0</Text>
        </View>
      </View>

      {/* Preço + botão */}
      <View style={styles.footer}>
        <Text style={styles.price}>R$00000,00</Text>
        <TouchableOpacity style={styles.button}>
          <Link href={'/imovel'}><Text style={styles.buttonText}>Ver mais</Text></Link>
          
        </TouchableOpacity>
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
  },
  info: {
    flexDirection: "row",
    justifyContent: "start",
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
    fontWeight: 500,
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
