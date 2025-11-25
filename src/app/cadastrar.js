import { Text, StyleSheet, ImageBackground, View, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import React from 'react';
import Checkbox from 'expo-checkbox';
import ModalMensagem from "../components/ModalMensagem";

export default function Cadastrar() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modal, setModal] = React.useState({ visible: false, title: '', message: '', onConfirm: null });

    // Agora aceita callback corretamente
    const showAlert = (title, message, onConfirm = null) => {
        setModal({ visible: true, title, message, onConfirm });
    };

    const handleCadastro = async () => {
        if (!name || !email || !senha) {
            showAlert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (!isChecked) {
            showAlert('Termos de Uso', 'Você precisa aceitar os termos de uso para continuar.');
            return;
        }

        setLoading(true);

        try {
            const userData = {
                nome: name,
                email: email,
                senha: senha
            };

            const response = await fetch('http://localhost:3100/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
          

            if (!response.ok) {
                const errorMessage = data.error || data.message || data.menssage || 'Erro ao cadastrar usuário';
                showAlert('Erro no Cadastro', errorMessage);
                return;
            }

            // Sucesso -> redireciona para login
            showAlert(
                'Sucesso!',
                'Cadastro realizado com sucesso!',
                () => {
                    setModal({ visible: false });
                    router.push('/login');
                }
            );

        } catch (error) {
            if (!modal.visible) {
                showAlert('Erro', 'Não foi possível conectar ao servidor. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">

            <ModalMensagem
                visible={modal.visible}
                title={modal.title}
                message={modal.message}
                onConfirm={modal.onConfirm || (() => setModal({ visible: false }))}
            />

            <Link style={styles.link} href={'/home'}>
                <Image style={styles.logo} source={require('../../assets/img/villa-logo-img.png')} />
            </Link>

            <View style={styles.container_input}>
                <Text style={styles.title}>Cadastro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                    value={name}
                    onChangeText={setName}
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor={'#375a76'}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                    editable={!loading}
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? '#146FBA' : undefined}
                        disabled={loading}
                    />
                    <Text style={styles.checkboxText}>
                        Li e aceito os <Text style={styles.link_text}>termos de uso</Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.link}
                    onPress={handleCadastro}
                    disabled={loading}
                >
                    <Text style={[styles.btn, loading && styles.btnDisabled]}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>
                Já possui uma conta? <Link href={'/login'} style={styles.link_text}>Faça Login!</Link>
            </Text>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 50,
    },
    text: {
        color: '#375A76'
    },
    logo: {
        width: 75,
        height: 75
    },
    container_input: {
        gap: 30,
        marginBottom: 60
    },
    title: {
        color: '#375A76',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#146FBA',
        borderRadius: 10,
        color: '#375A76',
        fontWeight: '500',
        padding: 5,
        width: '70vw'
    },
    link: {
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: '#146FBA',
        color: '#F2F1F6',
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: '500'
    },
    btnDisabled: {
        backgroundColor: '#7BA5C9',
        opacity: 0.7
    },
    link_text: {
        fontWeight: 'bold',
        color: '#146FBA'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 10
    },
    checkboxText: {
        color: '#375A76',
        fontSize: 14
    }
});
