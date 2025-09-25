import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient";
import Topo from "../components/Topo"
import Imovel from "../components/imovel"

export default function Visitas() {
    return (
        <View style={styles.container}>
            <Topo />
            <ScrollView>
                <Text style={styles.title}>Minhas Visitas</Text>

                <View style={styles.container_visita}>
                    <View style={styles.container_imovel}>
                        <View style={styles.img}>
                            <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                            <LinearGradient
                                colors={["transparent", "rgba(255, 255, 255, 0.7)"]}
                                style={styles.gradientOverlay}
                                locations={[0.5, 0, 0]}
                            />
                        </View>

                        <View style={styles.container_info}>
                            <View style={styles.container_text}>
                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Nome: </Text>
                                     <Text style={styles.text}>Daniel Santana</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Data: </Text>
                                     <Text style={styles.text}>25/08/2025</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Horário: </Text>
                                     <Text style={styles.text}>16:30</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Tel: </Text>
                                     <Text style={styles.text}>(12) 99600-0000</Text>
                                </View>
                            </View>

                            <View style={styles.container_status}>
                                <Text style={styles.status_text}>Status:</Text>
                                <Text style={styles.status}>Pedente</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container_imovel}>
                        <View style={styles.img}>
                            <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                            <LinearGradient
                                colors={["transparent", "rgba(255, 255, 255, 0.7)"]}
                                style={styles.gradientOverlay}
                                locations={[0.5, 0, 0]}
                            />
                        </View>

                        <View style={styles.container_info}>
                            <View style={styles.container_text}>
                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Nome: </Text>
                                     <Text style={styles.text}>Daniel Santana</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Data: </Text>
                                     <Text style={styles.text}>25/08/2025</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Horário: </Text>
                                     <Text style={styles.text}>16:30</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Tel: </Text>
                                     <Text style={styles.text}>(12) 99600-0000</Text>
                                </View>
                            </View>

                            <View style={styles.container_status}>
                                <Text style={styles.status_text}>Status:</Text>
                                <Text style={styles.status}>Pedente</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container_imovel}>
                        <View style={styles.img}>
                            <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                            <LinearGradient
                                colors={["transparent", "rgba(255, 255, 255, 0.7)"]}
                                style={styles.gradientOverlay}
                                locations={[0.5, 0, 0]}
                            />
                        </View>

                        <View style={styles.container_info}>
                            <View style={styles.container_text}>
                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Nome: </Text>
                                     <Text style={styles.text}>Daniel Santana</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Data: </Text>
                                     <Text style={styles.text}>25/08/2025</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Horário: </Text>
                                     <Text style={styles.text}>16:30</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Tel: </Text>
                                     <Text style={styles.text}>(12) 99600-0000</Text>
                                </View>
                            </View>

                            <View style={styles.container_status}>
                                <Text style={styles.status_text}>Status:</Text>
                                <Text style={styles.status}>Pedente</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container_imovel}>
                        <View style={styles.img}>
                            <Image style={styles.img} source={require('../../assets/img/luxo.jpg')} />
                            <LinearGradient
                                colors={["transparent", "rgba(255, 255, 255, 0.7)"]}
                                style={styles.gradientOverlay}
                                locations={[0.5, 0, 0]}
                            />
                        </View>

                        <View style={styles.container_info}>
                            <View style={styles.container_text}>
                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Nome: </Text>
                                     <Text style={styles.text}>Daniel Santana</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Data: </Text>
                                     <Text style={styles.text}>25/08/2025</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Horário: </Text>
                                     <Text style={styles.text}>16:30</Text>
                                </View>

                                <View style={styles.group_text}>
                                     <Text style={styles.bold}>Tel: </Text>
                                     <Text style={styles.text}>(12) 99600-0000</Text>
                                </View>
                            </View>

                            <View style={styles.container_status}>
                                <Text style={styles.status_text}>Status:</Text>
                                <Text style={styles.status}>Pedente</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    title: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#146FBA',
        backgroundColor: '#E3F2FF',
        padding: 10,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
    },
    container_visita: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginBottom: 20,
    },
    container_imovel: {
        width: 350,
        height: 150,
        backgroundColor: '#f5f5f5',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        gap: 20,
    },
    img: {
        flex: 1,
        borderRadius: 10
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
    },
    container_info: {
        gap: 10,
    },
    container_text: {
        gap: 5,
    },
    group_text: {
        display: 'flex',
        flexDirection: 'row',
    },
    bold: {
        fontWeight: 600,
        
    },
    text: {
        color: '#375A76'
    },
    container_status: {
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        gap: 10,
        backgroundColor: '#146FBA',
        borderRadius: 10,
    },
    status_text: {
        fontWeight: 500,
        color: '#fff'
    },
    status: {
        color: '#ffd51bff'
    },
})