import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ModalMensagem({ visible, title, message, onConfirm, confirmText = 'OK' }) {
    if (!visible) {
        return null;
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onConfirm}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={onConfirm}>
                        <Text style={styles.modalButtonText}>{confirmText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#375A76',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#146FBA',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});