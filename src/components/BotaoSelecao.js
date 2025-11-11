import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotaoSelecao({ label, isSelected, onPress }) {
    
    // Define a cor de fundo e do texto baseado no estado de seleção
    const buttonStyle = isSelected ? selectionStyles.buttonSelected : selectionStyles.buttonDefault;
    const textStyle = isSelected ? selectionStyles.textSelected : selectionStyles.textDefault;

    return (
        <TouchableOpacity 
            style={buttonStyle}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    );
}

const selectionStyles = StyleSheet.create({
    buttonDefault: {
        backgroundColor: '#F0F8FF', // Cor de fundo do seu design
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 8,
        marginRight: 8,
    },
    buttonSelected: {
        backgroundColor: '#1E90FF', // Azul vibrante para seleção
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#1E90FF',
        marginBottom: 8,
        marginRight: 8,
    },
    textDefault: {
        color: '#333',
        fontWeight: '500',
        fontSize: 13,
    },
    textSelected: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
});