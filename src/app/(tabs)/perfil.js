import { Text, StyleSheet, ImageBackground, View, TouchableOpacity, Alert, TextInput, ActivityIndicator, Modal } from "react-native"
import { Image } from "expo-image"
import { router, useFocusEffect } from "expo-router"
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedData, setEditedData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    // Carregar dados quando a tela ganhar foco
    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const loadUserData = async () => {
        try {
            setLoading(true);
            
            // Buscar dados do AsyncStorage
            const userDataString = await AsyncStorage.getItem('userData');
            
            
            if (!userDataString) {
                console.log('❌ Nenhum usuário encontrado, redirecionando...');
              console.log('Sessão expirada', 'Por favor, faça login novamente.', [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/login')
                    }
                ]);
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
            console.error('❌ Erro ao carregar dados:', error);
           console.log('Erro', 'Não foi possível carregar os dados do usuário');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            // Validação dos campos
            if (!editedData.nome || !editedData.email) {
               console.log('Erro', 'Por favor, preencha nome e email');
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(editedData.email)) {
                console.log('Erro', 'Por favor, insira um email válido');
                return;
            }

            
            
            // Abrir modal de confirmação
            setShowSaveModal(true);
        } else {
           
            setEditedData({
                nome: userData.nome,
                email: userData.email,
                senha: userData.senha || ''
            });
            setIsEditing(true);
        }
    };

    const confirmSave = async () => {
        setShowSaveModal(false);
        await saveUserData();
    };

    const cancelSave = () => {
        console.log('❌ Salvamento cancelado');
        setShowSaveModal(false);
        // Reverter dados editados
        setEditedData({
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha || ''
        });
        setIsEditing(false);
    };

    const saveUserData = async () => {
        try {
            setSaving(true);

          
            const response = await fetch(`http://localhost:3100/usuario/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: editedData.nome,
                    email: editedData.email,
                    senha: editedData.senha
                })
            });

            

            const data = await response.json();
        
            if (response.ok) {
                // Atualizar dados locais
                const updatedUser = { ...userData, ...editedData };
                setUserData(updatedUser);
                
                // Atualizar AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
                
                setIsEditing(false);
                Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            } else {
                if (response.status === 409) {
                    console.log('Erro', 'Este email já está sendo usado por outro usuário');
                } else {
                    console.log('Erro', data.message || 'Não foi possível atualizar os dados');
                }
            }

        } catch (error) {
            console.error('❌ Erro ao salvar dados:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        try {
            console.log('👋 Saindo da conta...');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('userToken');
            setShowLogoutModal(false);
            router.replace('/login');
        } catch (error) {
            console.error('❌ Erro ao fazer logout:', error);
        }
    };

    const cancelLogout = () => {
        console.log('❌ Logout cancelado');
        setShowLogoutModal(false);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setShowDeleteModal(false);

            const response = await fetch(`http://localhost:3100/usuario/${userData.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await AsyncStorage.removeItem('userData');
                await AsyncStorage.removeItem('userToken');
                router.replace('/login');
            } else {
                const data = await response.json();
            }
        } catch (error) {
            console.error('❌ Erro ao excluir conta:', error);
        }
    };

    const cancelDelete = () => {
        console.log('❌ Exclusão cancelada');
        setShowDeleteModal(false);
    };

    // Tela de loading
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

    // Se não houver dados após carregar, não renderiza nada (vai redirecionar)
    if (!userData) {
        return null;
    }

    return (
        <ImageBackground style={styles.container} source={require('../../../assets/img/gradient2.png')} resizeMode="stretch">
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../../../assets/img/villa-logo-img.png')} />
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Meu Perfil</Text>
                    
                    {/* CAMPO NOME */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nome</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.nome}
                                onChangeText={(text) => setEditedData({...editedData, nome: text})}
                                placeholder="Digite seu nome"
                                editable={!saving}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.nome || 'Não informado'}</Text>
                        )}
                    </View>

                    {/* CAMPO EMAIL */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.email}
                                onChangeText={(text) => setEditedData({...editedData, email: text})}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!saving}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.email || 'Não informado'}</Text>
                        )}
                    </View>

                    {/* CAMPO SENHA */}
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Senha</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.senha}
                                onChangeText={(text) => setEditedData({...editedData, senha: text})}
                                placeholder="Digite sua senha"
                                secureTextEntry={true}
                                editable={!saving}
                            />
                        ) : (
                            <Text style={styles.value}>••••••••</Text>
                        )}
                    </View>

                    {/* Botões em linha */}
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={[styles.buttonInline, styles.updateButton, saving && styles.buttonDisabled]}
                            onPress={handleEdit}
                            disabled={saving}>
                            {saving ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.buttonText}>
                                    {isEditing ? 'Atualizar' : 'Editar'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.buttonInline, styles.deleteButton]}
                            onPress={handleDelete}
                            disabled={saving}>
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={handleLogout}
                        disabled={saving}>
                        <Text style={[styles.buttonText, styles.logoutText]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal de Confirmação de Exclusão */}
            <Modal
                transparent={true}
                visible={showDeleteModal}
                animationType="fade"
                onRequestClose={cancelDelete}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>⚠️ Excluir Conta</Text>
                        <Text style={styles.modalMessage}>
                            Esta ação é irreversível!{'\n'}
                            Tem certeza que deseja excluir sua conta?
                        </Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonCancel]}
                                onPress={cancelDelete}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonDelete]}
                                onPress={confirmDelete}>
                                <Text style={styles.modalButtonTextConfirm}>Sim, Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Confirmação de Salvamento */}
            <Modal
                transparent={true}
                visible={showSaveModal}
                animationType="fade"
                onRequestClose={cancelSave}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Atualizar Dados</Text>
                        <Text style={styles.modalMessage}>Deseja salvar as alterações?</Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonCancel]}
                                onPress={cancelSave}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonSave]}
                                onPress={confirmSave}>
                                <Text style={styles.modalButtonTextConfirm}>Sim, Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Confirmação de Logout */}
            <Modal
                transparent={true}
                visible={showLogoutModal}
                animationType="fade"
                onRequestClose={cancelLogout}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sair da Conta</Text>
                        <Text style={styles.modalMessage}>Tem certeza que deseja sair?</Text>
                        
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonCancel]}
                                onPress={cancelLogout}>
                                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonConfirm]}
                                onPress={confirmLogout}>
                                <Text style={styles.modalButtonTextConfirm}>Sim, Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 60,
        height: 60
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#375A76',
    },
    profileContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    infoContainer: {
        backgroundColor: '#E3F2FF',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: '#fff',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoItem: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#84C4FB',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#375A76',
    },
    input: {
        fontSize: 16,
        color: '#375A76',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#84C4FB',
        borderRadius: 6,
        padding: 8,
        marginTop: 2,
    },
    button: {
        width: '70%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignSelf: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 20,
        paddingHorizontal: 0,
    },
    buttonInline: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    updateButton: {
        backgroundColor: '#146FBA',
    },
    deleteButton: {
        backgroundColor: '#DC3545',
    },
    editButton: {
        backgroundColor: '#146FBA',
        marginTop: 20,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    logoutButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#146FBA',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutText: {
        color: '#146FBA',
    },
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
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#375A76',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#375A76',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonCancel: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    modalButtonConfirm: {
        backgroundColor: '#DC3545',
    },
    modalButtonSave: {
        backgroundColor: '#146FBA',
    },
    modalButtonDelete: {
        backgroundColor: '#DC3545',
    },
    modalButtonTextCancel: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalButtonTextConfirm: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})