import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Topo() {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Link href={'/home'}><Image
        source={require('../../assets/img/villa-logo-img.png')}
        style={styles.logo}
      />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
});
