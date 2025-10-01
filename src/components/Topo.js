import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Topo() {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Link href={'/'}><Image
        source={require('../../assets/img/villa-logo-img.png')}
        style={styles.logo}
      />
      </Link>

      {/* Ícones */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Link href={'/filtro'}><Ionicons name="search-outline" size={28} color="#333" /></Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Link href={'/favoritos'}><Ionicons name="heart-outline" size={28} color="#e63946" /></Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Link href={'/visitas'}><MaterialCommunityIcons name="calendar-outline" size={28} color="#333" /></Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 50,
    height: 40,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
});
