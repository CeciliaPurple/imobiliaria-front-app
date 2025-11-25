import {
    Text,
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Modal
} from "react-native";
import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalMensagem from "../../components/ModalMensagem";

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState(null);

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [modalMsg, setModalMsg] = useState({
        visible: false,
        title: '',
        message: ''
    });

    const [editedData, setEditedData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    // Carregar dados ao abrir a tela
    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const showAlert = (title, message, callback = null) => {
        setModalMsg({ visible: true, title, message, callback });
    };

    const loadUserData = async () => {
        try {
            setLoading(true);

            const userDataString = await AsyncStorage.getItem('userData');
            if (!userDataString) {
                router.replace('/login');
                return;
            }

            const user = JSON.parse(userDataString);

            setUserData(user);
            setEditedData({
                nome: user.nome || '',
                email: user.email || '',
                senha: user.senha || ''
            });

        } catch (error) {
            showAlert('Erro', 'Falha ao carregar os dados do usuário.');
        } finally {
            setLoading(false);
        }
    };

    // EDITAR OU SALVAR
    const handleEdit = () => {
        if (isEditing) {
            if (!editedData.nome || !editedData.email) {
                showAlert("Erro", "Preencha nome e email antes de salvar.");
                return;
            }

            setShowSaveModal(true);
        } else {
            setIsEditing(true);
        }
    };

    const confirmSave = async () => {
        setShowSaveModal(false);
        await saveUserData();
    };

    const cancelSave = () => {
        setShowSaveModal(false);
        setIsEditing(false);
        setEditedData({
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha || ''
        });
    };

    const saveUserData = async () => {
        try {
            setSaving(true);

            const response = await fetch(`http://localhost:3100/usuario/${userData.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: editedData.nome,
                    email: editedData.email,
                    senha: editedData.senha
                })
            });

            const data = await response.json();

            if (response.ok) {
                const updatedUser = { ...userData, ...editedData };
                setUserData(updatedUser);

                await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

                setIsEditing(false);

                showAlert("Sucesso", "Conta atualizada com sucesso!");
            } else {
                showAlert("Erro", data.message || "Falha ao atualizar a conta.");
            }

        } catch (error) {
            showAlert("Erro", "Erro ao salvar os dados.");
        } finally {
            setSaving(false);
        }
    };

    // LOGOUT
    const confirmLogout = async () => {
        try {
            await AsyncStorage.removeItem("userData");
            await AsyncStorage.removeItem("userToken");

            setShowLogoutModal(false);

            router.replace("/login");
        } catch (error) {
            showAlert("Erro", "Erro ao sair da conta.");
        }
    };

    // EXCLUIR CONTA
    const confirmDelete = async () => {
        try {
            setShowDeleteModal(false);

            const response = await fetch(`http://localhost:3100/usuario/${userData.id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                await AsyncStorage.removeItem("userData");
                await AsyncStorage.removeItem("userToken");

                showAlert("Conta excluída", "Sua conta foi removida com sucesso!", () => {
                    router.replace("/cadastrar");
                });

            } else {
                showAlert("Erro", "Não foi possível excluir sua conta.");
            }
        } catch (error) {
            showAlert("Erro", "Erro ao tentar excluir conta.");
        }
    };

    // LOADING
    if (loading) {
        return (
            <ImageBackground style={styles.container} source={require('../../../assets/img/gradient2.png')} resizeMode="stretch">
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#146FBA" />
                    <Text style={styles.loadingText}>Carregando perfil...</Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground style={styles.container} source={require('../../../assets/img/gradient2.png')} resizeMode="stretch">

            {/* MODAL DE MENSAGEM GERAL */}
            <ModalMensagem
                visible={modalMsg.visible}
                title={modalMsg.title}
                message={modalMsg.message}
                onConfirm={() => {
                    setModalMsg({ visible: false, title: '', message: '' });
                    if (modalMsg.callback) modalMsg.callback();
                }}
            />

            {/* TOPO */}
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../../../assets/img/villa-logo-img.png')} />
            </View>

            {/* CONTAINER */}
            <View style={styles.profileContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Meu Perfil</Text>

                    {/* NOME */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nome</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.nome}
                                onChangeText={(text) => setEditedData({ ...editedData, nome: text })}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.nome}</Text>
                        )}
                    </View>

                    {/* EMAIL */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.email}
                                onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.email}</Text>
                        )}
                    </View>

                    {/* SENHA */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Senha</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                value={editedData.senha}
                                onChangeText={(text) => setEditedData({ ...editedData, senha: text })}
                            />
                        ) : (
                            <Text style={styles.value}>••••••••</Text>
                        )}
                    </View>

                    {/* BOTÕES */}
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={[styles.buttonInline, styles.updateButton]}
                            onPress={handleEdit}
                        >
                            <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.buttonInline, styles.deleteButton]}
                            onPress={() => setShowDeleteModal(true)}
                        >
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>

                    {/* LOGOUT */}
                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={() => setShowLogoutModal(true)}
                    >
                        <Text style={[styles.buttonText, styles.logoutText]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* MODAL CONFIRMAR SALVAR */}
            <Modal visible={showSaveModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Atualizar dados</Text>
                        <Text style={styles.modalMessage}>Deseja realmente salvar?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={cancelSave}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonSave]} onPress={confirmSave}>
                                <Text style={styles.modalButtonTextConfirm}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL CONFIRMAR EXCLUSÃO */}
            <Modal visible={showDeleteModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Excluir conta</Text>
                        <Text style={styles.modalMessage}>Tem certeza que deseja excluir definitivamente?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setShowDeleteModal(false)}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonDelete]} onPress={confirmDelete}>
                                <Text style={styles.modalButtonTextConfirm}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL CONFIRMAR LOGOUT */}
            <Modal visible={showLogoutModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sair da conta</Text>
                        <Text style={styles.modalMessage}>Tem certeza que deseja sair?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setShowLogoutModal(false)}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={confirmLogout}>
                                <Text style={styles.modalButtonTextConfirm}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { alignItems: 'center', paddingVertical: 20 },
    logo: { width: 60, height: 60 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16, color: '#375A76' },
    profileContainer: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
    infoContainer: {
        backgroundColor: '#E3F2FF',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    title: { fontSize: 22, fontWeight: 'bold', color: '#375A76', marginBottom: 15, textAlign: 'center' },
    infoItem: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#84C4FB',
    },
    label: { fontSize: 14, fontWeight: 'bold', color: '#375A76', marginBottom: 4 },
    value: { fontSize: 16, color: '#375A76' },
    input: {
        fontSize: 16,
        color: '#375A76',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#84C4FB',
        borderRadius: 6,
        padding: 8,
    },
    buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 20 },
    buttonInline: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
    updateButton: { backgroundColor: '#146FBA' },
    deleteButton: { backgroundColor: '#DC3545' },
    button: {
        width: '70%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    logoutButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#146FBA' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logoutText: { color: '#146FBA' },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        elevation: 5
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    modalMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
    modalButtonCancel: { backgroundColor: '#ddd' },
    modalButtonSave: { backgroundColor: '#146FBA' },
    modalButtonDelete: { backgroundColor: '#DC3545' },
    modalButtonConfirm: { backgroundColor: '#146FBA' },
    modalButtonTextCancel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    modalButtonTextConfirm: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});
