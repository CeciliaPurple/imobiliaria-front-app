import { Text, StyleSheet, ImageBackground, View, TouchableOpacity, Alert, TextInput, ScrollView } from "react-native"
import { Image } from "expo-image"
import { Link, router } from "expo-router"
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999'
    });
    const [editedData, setEditedData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999'
    });

    const handleEdit = () => {
        if (isEditing) {
            // Validação dos campos
            if (!editedData.name || !editedData.email || !editedData.telefone) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
                return;
            }

            Alert.alert(
                'Confirmar Alterações',
                'Deseja salvar as alterações?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => {
                            setEditedData(userData);
                            setIsEditing(false);
                        }
                    },
                    {
                        text: 'Salvar',
                        onPress: () => {
                            setUserData(editedData);
                            setIsEditing(false);
                            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
                        }
                    }
                ]
            );
        } else {
            setEditedData(userData);
            setIsEditing(true);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => router.push('/login')
                }
            ]
        );
    };

    return (
        <ImageBackground style={styles.container} source={require('../../../assets/img/gradient2.png')} resizeMode="stretch">
            <View style={styles.header}>
                <Image style={styles.logo} source={require('../../../assets/img/villa-logo-img.png')} />
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Meu Perfil</Text>
                    
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nome</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.name}
                                onChangeText={(text) => setEditedData({...editedData, name: text})}
                                placeholder="Digite seu nome"
                            />
                        ) : (
                            <Text style={styles.value}>{userData.name}</Text>
                        )}
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.email}
                                onChangeText={(text) => setEditedData({...editedData, email: text})}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
                            />
                        ) : (
                            <Text style={styles.value}>{userData.email}</Text>
                        )}
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Telefone</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={editedData.telefone}
                                onChangeText={(text) => setEditedData({...editedData, telefone: text})}
                                placeholder="Digite seu telefone"
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.value}>{userData.telefone}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={handleEdit}>
                        <Text style={styles.buttonText}>
                            {isEditing ? 'Salvar' : 'Editar Perfil'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={handleLogout}>
                        <Text style={[styles.buttonText, styles.logoutText]}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    profileContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 15,
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
    editButton: {
        backgroundColor: '#146FBA',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DC3545',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutText: {
        color: '#DC3545',
    }
})