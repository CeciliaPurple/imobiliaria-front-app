import { Text, StyleSheet, ImageBackground, View, TextInput } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import React from 'react';



export default function Login() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">
            <Link style={styles.link}  href={'/enter'}><Image style={styles.logo} source={require('../../assets/img/villa-logo-img.png')} /></Link>

            <View style={styles.container_input}>
                <Text style={styles.title}>Login</Text>
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

                {/*Campo Senha*/}
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor={'rgba(55, 90, 118, 0.5)'}
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={true}
                    />
                </View>

                {/*Botão*/}
                <Link href={'/'} style={styles.link}>
                    <Text style={styles.btn}>Entrar</Text>
                </Link>
            </View>

            <Text style={styles.text}>Não possui uma conta? <Link href={'/cadastrar'} style={styles.link_text}>Cadastre-se!</Link></Text>

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
        marginBottom: 120
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
    }
})