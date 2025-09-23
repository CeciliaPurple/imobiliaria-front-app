import { Text, StyleSheet, ImageBackground, View } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"



export default function Home() {
    return (
        <ImageBackground style={styles.container} source={require('../../assets/img/gradient2.png')} resizeMode="stretch">
            <View style={styles.container_logo}>
                <Image style={styles.logo} source={require('../../assets/img/villa-logo-nome.png')} />
                <Text style={styles.text_logo}>O lugar certo para o seu próximo capítulo.</Text>
            </View>

            <View style={styles.container_group}>
                <Link href={'/'} style={styles.link}>
                    <Text style={styles.btn}>Entrar</Text>
                </Link>

                <Text style={styles.text}>Não possui uma conta? <Link href={'/cadastrar'} style={styles.link_text}>Cadastre-se!</Link></Text>
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
        width: 200,
        height: 156
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