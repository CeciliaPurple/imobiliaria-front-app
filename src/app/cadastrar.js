import { Text, StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Alert } from "react-native"
import { Image } from "expo-image"
import { Link, router } from "expo-router"
import React from 'react';
import Checkbox from 'expo-checkbox';


export default function Cadastrar() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(false);

    const handleCadastro = () => {
        if (!name || !email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }
        if (!isChecked) {
            Alert.alert('Erro', 'Você precisa aceitar os termos para continuar');
            return;
        }
        // Aqui você pode adicionar a lógica para enviar os dados para seu backend
        router.push('/home');
    };

    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">
            <Link style={styles.link} href={'/enter'}><Image style={styles.logo} source={require('../../assets/img/villa-logo-img.png')} /></Link>
            <View style={styles.container_input}>
                <Text style={styles.title}>Cadastro</Text>
                {/*Campo Nome*/}
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/*Campo Email*/}
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                {/*Campo Senha*/}
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor={'#375a76'}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />
                </View>

                {/*Checkbox Termos*/}
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? '#146FBA' : undefined}
                    />
                    <Text style={styles.checkboxText}>
                        Li e aceito os <Text style={styles.link_text}>termos de uso</Text>
                    </Text>
                </View>

                {/*Botão*/}
                <TouchableOpacity style={styles.link} onPress={handleCadastro}>
                    <Text style={styles.btn}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Já possui uma conta? <Link href={'/login'} style={styles.link_text}>Faça Login!</Link></Text>

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
    container_logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    text_logo: {
        color: '#146FBA',
        width: 250,
        textAlign: 'center'
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
        marginBottom: 60
    },
    title: {
        color: '#375A76',
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#146FBA',
        borderRadius: 10,
        color: '#375A76',
        fontWeight: 500,
        padding: 5,
        width: '70vw',

    },
    inputFocado: {
        borderBottomColor: 'transparent'
    },
    container_group: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    link: {
        width: 'fit-content',
        alignSelf: 'center',
    },
    btn: {
        backgroundColor: '#146FBA',
        color: '#F2F1F6',
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 500
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
})