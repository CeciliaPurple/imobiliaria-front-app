import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModalMensagem({ visible, title, message, onConfirm, onCancel, showCancel = false }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onConfirm}
            accessibilityViewIsModal={true}
            statusBarTranslucent={false}
        >
            {/* Overlay - removido aria-hidden */}
            <Pressable 
                style={styles.overlay}
                onPress={showCancel ? null : onConfirm}
                accessible={false}
            >
                {/* Card do Modal */}
                <Pressable 
                    style={styles.modalContainer}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Ícone */}
                    <View style={styles.iconContainer}>
                        <Ionicons 
                            name={title === "Erro" ? "alert-circle" : title === "Sucesso" ? "checkmark-circle" : "information-circle"} 
                            size={60} 
                            color={title === "Erro" ? "#DE302A" : title === "Sucesso" ? "#28A745" : "#146FBA"} 
                        />
                    </View>

                    {/* Título */}
                    <Text style={styles.title}>{title}</Text>

                    {/* Mensagem */}
                    <Text style={styles.message}>{message}</Text>

                    {/* Botões */}
                    <View style={styles.buttonContainer}>
                        {showCancel && onCancel && (
                            <TouchableOpacity 
                                style={[styles.button, styles.cancelButton]} 
                                onPress={onCancel}
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel="Cancelar"
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        )}
                        
                        <TouchableOpacity 
                            style={[styles.button, styles.confirmButton, showCancel && { flex: 1 }]} 
                            onPress={onConfirm}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityLabel="Confirmar"
                        >
                            <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 25,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    iconContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#6C757D',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    confirmButton: {
        backgroundColor: '#146FBA',
        flex: 1,
    },
    confirmButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    },
    cancelButtonText: {
        color: '#375A76',
        fontSize: 16,
        fontWeight: '600',
    },
});