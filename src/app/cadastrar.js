import { Text, StyleSheet, ImageBackground, View, TextInput } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import React from 'react';



export default function Home() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [estaFocado, setFocus] = React.useState(false);

    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">
            <Image style={styles.logo} source={require('../../assets/img/villa-logo-img.png')} />

            <View style={styles.container_input}>
                <Text style={styles.title}>Cadastro</Text>
                {/*Campo Nome*/}
                <View>
                    <TextInput 
                    style={[styles.input, estaFocado ? styles.inputFocado : null]}
                    placeholder="Nome de usuário"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={name}
                    onChangeText={setName}
                    />
                </View>

                {/*Campo Email*/}
                <View>
                    <TextInput 
                    style={styles.input}
                    placeholder="Email"
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
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={styles.container_group}>
                <Link href={'/'} style={styles.link}>
                    <Text style={styles.btn}>Cadastrar</Text>
                </Link>

                <Text style={styles.text}>Já possui uma conta?  <Link href={'/'} style={styles.link_text}>Faça Login!</Link></Text>
            </View>

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
        gap: 30
    },
    title: {
        color: '#375A76',
        fontSize: 24,
        marginBottom: 10
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#146FBA',
        borderRadius: 10,
        color: 'rgba(55, 90, 118, 0.5)',
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
        width: 'fit-content'
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