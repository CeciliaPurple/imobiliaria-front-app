import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useAuthStore } from '../Store/useAuthStore';

/**
 * Verifica se o token JWT está expirado
 */
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        // Decodifica o token JWT (formato: header.payload.signature)
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Verifica a expiração (exp está em segundos)
        const expirationTime = payload.exp * 1000; // Converte para milissegundos
        const currentTime = Date.now();
        
        // Adiciona margem de 1 minuto para evitar falhas em requisições longas
        const margin = 60 * 1000; // 1 minuto
        
        
        return currentTime >= (expirationTime - margin);
    } catch (error) {
        console.error('❌ Erro ao verificar token:', error);
        return true; // Se der erro, considera expirado
    }
};

/**
 * Verifica se o usuário está autenticado e token válido
 */
export const checkAuth = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');

        // Se não tem token ou userData, não está autenticado
        if (!token || !userData) {
            // Limpa o store do Zustand
            useAuthStore.getState().logout();
            return { isAuthenticated: false, needsLogin: true };
        }

        // Verifica se o token expirou
        if (isTokenExpired(token)) {
            console.log('⚠️ Token expirado!');
            await logout(); // Limpa dados
            return { isAuthenticated: false, needsLogin: true, expired: true };
        }

        // Atualiza o store do Zustand com os dados válidos
        const profile = JSON.parse(userData);
        useAuthStore.getState().login({ profile, token });

        return { 
            isAuthenticated: true, 
            needsLogin: false,
            token,
            profile
        };
    } catch (error) {
        console.error('❌ Erro ao verificar autenticação:', error);
        useAuthStore.getState().logout();
        return { isAuthenticated: false, needsLogin: true };
    }
};

/**
 * Faz logout e limpa dados do usuário
 */
export const logout = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        
        // Limpa o store do Zustand
        useAuthStore.getState().logout();
        
        console.log('✅ Logout realizado');
    } catch (error) {
        console.error('❌ Erro ao fazer logout:', error);
    }
};

/**
 * Redireciona para login se não autenticado
 */
export const requireAuth = async (showAlert = null) => {
    const { isAuthenticated, expired } = await checkAuth();
    
    if (!isAuthenticated) {
        if (showAlert && expired) {
            showAlert(
                'Sessão Expirada',
                'Sua sessão expirou. Faça login novamente para continuar.',
                () => {
                    router.replace('/login');
                }
            );
        } else {
            router.replace('/login');
        }
        return false;
    }
    
    return true;
};

/**
 * Interceptor para requisições com token
 * Verifica automaticamente se o token expirou
 */
export const fetchWithAuth = async (url, options = {}) => {
    const { isAuthenticated, token, expired } = await checkAuth();

    if (!isAuthenticated) {
        if (expired) {
            throw new Error('TOKEN_EXPIRED');
        }
        throw new Error('NOT_AUTHENTICATED');
    }

    // Adiciona o token no header
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, { ...options, headers });

        // Se receber 401 (não autorizado), token pode ter expirado
        if (response.status === 401) {
            console.log('⚠️ Token inválido ou expirado (401)');
            await logout();
            throw new Error('TOKEN_EXPIRED');
        }

        return response;
    } catch (error) {
        console.error('❌ Erro na requisição:', error);
        throw error;
    }
};

/**
 * Salva dados de autenticação após login
 */
export const saveAuthData = async (token, userData) => {
    try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('✅ Dados de autenticação salvos');
    } catch (error) {
        console.error('❌ Erro ao salvar dados de autenticação:', error);
        throw error;
    }
};