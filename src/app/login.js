import { Text, StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import { Image } from "expo-image"
import { Link, useRouter } from "expo-router"
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        // Validações básicas
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        setLoading(true);

        try {
            console.log('🚀 Iniciando login...');
            console.log('📧 Email:', email);
            
            const response = await fetch('http://localhost:3100/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    senha: senha
                })
            });

            console.log('📡 Status da resposta:', response.status);
            
            const data = await response.json();
            console.log('📦 Data completa recebida:', JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log('✅ Login bem-sucedido!');
                
                // Verificar qual formato o backend retorna
                let userData;
                
                if (data.user) {
                    console.log('👤 Formato: data.user');
                    userData = data.user;
                } else if (data.usuario) {
                    console.log('👤 Formato: data.usuario');
                    userData = data.usuario;
                } else {
                    console.log('👤 Formato: data direto');
                    userData = data;
                }
                
                console.log('💾 Dados a serem salvos:', JSON.stringify(userData, null, 2));
                
                // Salvar no AsyncStorage
                try {
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    console.log('✅ Dados salvos no AsyncStorage!');
                    
                    // IMPORTANTE: Verificar se realmente salvou
                    const verificacao = await AsyncStorage.getItem('userData');
                    console.log('🔍 Verificação - dados no storage:', verificacao);
                    
                    if (!verificacao) {
                        console.error('❌ ERRO: Dados não foram salvos!');
                        Alert.alert('Erro', 'Não foi possível salvar os dados');
                        return;
                    }
                    
                    // Salvar token se houver
                    if (data.token) {
                        await AsyncStorage.setItem('userToken', data.token);
                        console.log('🔑 Token salvo!');
                    }
                    
                } catch (storageError) {
                    console.error('❌ Erro ao salvar no AsyncStorage:', storageError);
                    Alert.alert('Erro', 'Não foi possível salvar os dados: ' + storageError.message);
                    return;
                }
                
                console.log('🏠 Redirecionando para home...');
                
                // Pequeno delay para garantir que salvou
                setTimeout(() => {
                    router.push('/home');
                }, 100);
                
            } else {
                // Tratamento de erros
                console.log('❌ Erro na resposta:', data);
                
                if (response.status === 401) {
                    Alert.alert('Erro', 'Email ou senha incorretos');
                } else if (response.status === 404) {
                    Alert.alert('Erro', 'Usuário não encontrado');
                } else {
                    Alert.alert('Erro', data.message || 'Erro ao fazer login');
                }
            }

        } catch (error) {
            console.error('❌ Erro geral:', error);
            Alert.alert(
                'Erro de Conexão', 
                'Não foi possível conectar ao servidor. Verifique sua conexão.\n\n' + error.message
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <ImageBackground 
            style={styles.container} 
            source={require('../../assets/img/gradient2.png')} 
            resizeMode="stretch"
        >
            <Link style={styles.link} href={'/home'}>
                <Image 
                    style={styles.logo} 
                    source={require('../../assets/img/villa-logo-img.png')} 
                />
            </Link>

            <View style={styles.container_input}>
                <Text style={styles.title}>Login</Text>
                
                {/* Campo Email */}
                <View>
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
                </View>

                {/* Campo Senha */}
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                        editable={!loading}
                    />
                </View>

                {/* Botão de Login */}
                <TouchableOpacity 
                    style={[styles.btnContainer, loading && styles.btnDisabled]} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#F2F1F6" />
                    ) : (
                        <Text style={styles.btn}>Entrar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>
                Não possui uma conta? {' '}
                <Link href={'/cadastrar'} style={styles.link_text}>
                    Cadastre-se!
                </Link>
            </Text>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        display: 'flex',
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
        display: 'flex',
        gap: 30,
        marginBottom: 120,
        width: '100%',
        alignItems: 'center'
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
        width: 280,
        minWidth: 280
    },
    link: {
        alignSelf: 'center',
    },
    btnContainer: {
        backgroundColor: '#146FBA',
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 10,
        minWidth: 200,
        alignItems: 'center'
    },
    btnDisabled: {
        opacity: 0.6
    },
    btn: {
        color: '#F2F1F6',
        fontSize: 16,
        fontWeight: '500'
    },
    link_text: {
        fontWeight: 'bold',
        color: '#146FBA'
    }
})