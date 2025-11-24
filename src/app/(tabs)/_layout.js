import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function RootLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#146FBA',
                    tabBarInactiveTintColor: '#143047ff',
                    tabBarLabelStyle: { fontSize: 8 },
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabel: () => null, // Remove completamente o label
                    tabBarStyle: {
                        backgroundColor: "#ffffffff",
                        borderTopWidth: 0,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        elevation: 10,
                    }
                })}
            >
                <Tabs.Screen 
                    name="filtro"
                    options={{ 
                        title: "Pesquisar",
                        tabBarIcon: ({color, focused}) => (
                            <Fontisto name="search" size={focused ? 28 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="favoritos"
                    options={{ 
                        title: "Favoritos",
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons name="heart" size={focused ? 28 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="home"
                    options={{ 
                        title: "Home",
                        tabBarIcon: ({color, focused}) => (
                            <FontAwesome5 name="home" size={focused ? 28 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="visitas"
                    options={{ 
                        title: "Visitas",
                        tabBarIcon: ({color, focused}) => (
                            <FontAwesome name="calendar" size={focused ? 28 : 24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="perfil"
                    options={{ 
                        title: "Perfil",
                        tabBarIcon: ({color, focused}) => (
                            <FontAwesome name="user" size={focused ? 28 : 24} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
