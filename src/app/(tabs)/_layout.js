import { Tabs } from "expo-router"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function RootLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#146FBA',
            tabBarInactiveTintColor: '#143047ff',
            tabBarLabelStyle: { fontSize: 8 },
            headerShown: false,
            tabBarShowLabel: false,
        }}
        >
            <Tabs.Screen 
                name="favoritos"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color}  /> 
                }}
            />
            <Tabs.Screen 
                name="filtro"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color}) => <Fontisto name="search" size={24} color={color} />
                }}
            />
             <Tabs.Screen 
                name="index"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color}) => <FontAwesome5 name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen 
                name="agenda"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color}) => <FontAwesome name="calendar" size={24} color={color} />
                }}
            />
           
            <Tabs.Screen 
                name="perfil"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} />
                }}
            />
        </Tabs>
    )}