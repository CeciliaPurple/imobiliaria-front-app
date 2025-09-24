import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Topo() {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Image
        source={require('../../assets/img/villa-logo-img.png')} 
        style={styles.logo}
      />

      {/* Ícones */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="heart-outline" size={28} color="#e63946" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="calendar-outline" size={28} color="#333" />
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
    paddingHorizontal: 16,
    paddingVertical: 35,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logo: {
    width: 60,
    height: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
});
