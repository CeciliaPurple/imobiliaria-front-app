import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import BotaoSelecao from './BotaoSelecao'; // Componente de seleção

// --- DADOS PARA OS FILTROS DE BOTÕES ---
const TIPOS_IMOVEIS = ['Casas', 'Apartamento', 'Coberturas', 'Loft', 'Sítios e Chácaras', 'Flat'];
const AMBIENTES = ['Área de Serviços', 'Closet', 'Escritório', 'Jardim', 'Lavanderia', 'Piscina', 'Quintal'];
const CONVENIENCIAS = ['Ar-condicionado', 'Armários Planejados', 'Hidromassagem', 'Mobiliado'];
// ----------------------------------------

// Recebe: visible, onClose, onApply, filtrosIniciais
export default function ModalFiltros({ visible, onClose, onApply, filtrosIniciais }) {
    
    // Estado Local para os inputs do formulário
    const [filtros, setFiltros] = useState(filtrosIniciais);

    // Sincroniza o estado local quando o modal é aberto
    useEffect(() => {
        if (visible) {
            setFiltros(filtrosIniciais);
        }
    }, [visible, filtrosIniciais]);

    const handleInputChange = (nomeCampo, valor) => {
        setFiltros(prevFiltros => ({
            ...prevFiltros,
            [nomeCampo]: valor
        }));
    };

    // Lógica para seleção ÚNICA (ex: Tipo de Imóvel)
    const handleSingleSelect = (campo, valor) => {
        const novoValor = filtros[campo] === valor ? '' : valor;
        handleInputChange(campo, novoValor);
    };

    // Lógica para seleção MÚLTIPLA (ex: Ambientes, Conveniências)
    const handleMultipleSelect = (campo, valor) => {
        const listaAtual = filtros[campo];
        const novaLista = listaAtual.includes(valor)
            ? listaAtual.filter(item => item !== valor)
            : [...listaAtual, valor];
            
        handleInputChange(campo, novaLista);
    };

    // Lógica para Contadores (+1)
    const handleCounterChange = (campo, operacao) => {
        const valorAtual = filtros[campo];
        let novoValor = valorAtual;

        if (operacao === 'increment') {
            novoValor = valorAtual + 1;
        } else if (operacao === 'decrement' && valorAtual > 0) {
            novoValor = valorAtual - 1;
        } else if (operacao === 'reset') {
            novoValor = 0;
        }

        handleInputChange(campo, novoValor);
    };

    const handleApplyPress = () => onApply(filtros);
    const handleClearAndClose = () => onApply({ localizacao: '', tipoImovel: '', precoMin: '', precoMax: '', quartos: 0, banheiros: 0, garagens: 0, ambientes: [], conveniencias: [] });


    // --- Componente interno para os botões de contador (para simplificar o JSX) ---
    const CounterInput = ({ label, campo }) => (
        <View>
            <Text style={modalStyles.sectionTitle}>{label}</Text>
            <View style={modalStyles.counterGroup}>
                <Pressable 
                    style={modalStyles.counterButton} 
                    onPress={() => handleCounterChange(campo, 'decrement')}
                >
                    <Text style={modalStyles.counterButtonText}>-1</Text>
                </Pressable>
                <Text style={modalStyles.counterValue}>{filtros[campo]}</Text>
                <Pressable 
                    style={modalStyles.counterButton} 
                    onPress={() => handleCounterChange(campo, 'increment')}
                >
                    <Text style={modalStyles.counterButtonText}>+1</Text>
                </Pressable>
            </View>
        </View>
    );
    // -----------------------------------------------------------------------------

    return (
        <Modal
            animationType="slide" // A animação de slide continuará funcionando bem
            transparent={true}    
            visible={visible}     
            onRequestClose={onClose} 
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    
                    {/* CABEÇALHO */}
                    <View style={modalStyles.header}>
                        <Ionicons name="filter" size={18} color="#146fba" />
                        <Text style={modalStyles.modalTitle}>Filtros</Text>
                        <Pressable onPress={onClose} style={modalStyles.closeButton}>
                            <Text style={{ fontSize: 24, color: '#146fba' }}>×</Text>
                        </Pressable>
                    </View>

                    <ScrollView style={modalStyles.scrollViewContent}>
                        
                        {/* 1. LOCALIZAÇÃO */}
                        <Text style={modalStyles.sectionTitle}>Localização</Text>
                        <TextInput 
                            style={modalStyles.input} 
                            placeholder="Digite..."
                            value={filtros.localizacao}
                            onChangeText={(text) => handleInputChange('localizacao', text)}
                        />

                        {/* 2. TIPOS DE IMÓVEIS (Seleção Única) */}
                        <Text style={modalStyles.sectionTitle}>Tipos de Imóveis</Text>
                        <View style={modalStyles.buttonGroup}>
                            {TIPOS_IMOVEIS.map(tipo => (
                                <BotaoSelecao 
                                    key={tipo}
                                    label={tipo}
                                    isSelected={filtros.tipoImovel === tipo}
                                    onPress={() => handleSingleSelect('tipoImovel', tipo)}
                                />
                            ))}
                        </View>

                        {/* 3. PREÇO */}
                        <Text style={modalStyles.sectionTitle}>Preço</Text>
                        <View style={modalStyles.priceGroup}>
                            <View style={modalStyles.priceInputContainer}>
                                <Text style={modalStyles.priceLabel}>a partir de</Text>
                                <TextInput 
                                    style={modalStyles.priceInput} 
                                    keyboardType="numeric"
                                    placeholder="R$ 0,00"
                                    value={filtros.precoMin}
                                    onChangeText={(text) => handleInputChange('precoMin', text.replace(/[^0-9]/g, ''))}
                                />
                            </View>
                            <View style={modalStyles.priceInputContainer}>
                                <Text style={modalStyles.priceLabel}>Até</Text>
                                <TextInput 
                                    style={modalStyles.priceInput} 
                                    keyboardType="numeric"
                                    placeholder="R$ 0,00"
                                    value={filtros.precoMax}
                                    onChangeText={(text) => handleInputChange('precoMax', text.replace(/[^0-9]/g, ''))}
                                />
                            </View>
                        </View>

                        {/* 4. CONTADORES (Quartos, Banheiros, Garagens) */}
                        <CounterInput label="Quartos" campo="quartos" />
                        <CounterInput label="Banheiros" campo="banheiros" />
                        <CounterInput label="Garagens" campo="garagens" />

                        {/* 5. AMBIENTES (Seleção Múltipla) */}
                        <Text style={modalStyles.sectionTitle}>Ambientes</Text>
                        <View style={modalStyles.buttonGroup}>
                            {AMBIENTES.map(ambiente => (
                                <BotaoSelecao 
                                    key={ambiente}
                                    label={ambiente}
                                    isSelected={filtros.ambientes.includes(ambiente)}
                                    onPress={() => handleMultipleSelect('ambientes', ambiente)}
                                />
                            ))}
                        </View>

                        {/* 6. CONVENIÊNCIAS (Seleção Múltipla) */}
                        <Text style={modalStyles.sectionTitle}>Conveniências</Text>
                        <View style={modalStyles.buttonGroup}>
                            {CONVENIENCIAS.map(conv => (
                                <BotaoSelecao 
                                    key={conv}
                                    label={conv}
                                    isSelected={filtros.conveniencias.includes(conv)}
                                    onPress={() => handleMultipleSelect('conveniencias', conv)}
                                />
                            ))}
                        </View>

                        <View style={{ height: 40 }} /> 
                    </ScrollView>

                    {/* BOTÕES DE AÇÃO */}
                    <View style={modalStyles.buttonContainer}>
                        <Pressable 
                            style={[modalStyles.actionButton, modalStyles.clearButton]}
                            onPress={handleClearAndClose}
                        >
                            <Text style={modalStyles.clearButtonText}>Limpar Filtros</Text>
                        </Pressable>
                        <Pressable 
                            style={[modalStyles.actionButton, modalStyles.applyButton]}
                            onPress={handleApplyPress}
                        >
                            <Text style={modalStyles.applyButtonText}>Aplicar Filtros</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    // Estilos do Modal Overlay e Posição
    centeredView: {
        flex: 1,
        // *** ALTERAÇÃO AQUI: Alinhado à esquerda ***
        justifyContent: 'flex-start', // Continua no topo
        alignItems: 'flex-start',     // Alinha o conteúdo à esquerda
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    modalView: {
        backgroundColor: 'white',
        padding: 15,
        width: '85%', // Largura do modal (você pode ajustar)
        height: '100%', // Ocupa a altura total
        margin: 0,
        borderRadius: 0, 
        shadowColor: '#000',
        // *** ALTERAÇÃO AQUI: Sombra para a direita ***
        shadowOffset: { width: 2, height: 0 }, 
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    
    // Estilos do Cabeçalho
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#146fba',
        flex: 1, 
        marginLeft: 10,
    },
    closeButton: {
        padding: 5,
    },

    // Estilos do Conteúdo e Inputs
    scrollViewContent: {
        flexGrow: 1, 
        paddingRight: 5, 
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#146fba',
        marginTop: 15,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
    },

    // Estilos para Grupos de Botões (Seleção e Múltipla)
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    
    // Estilos para a seção de Preço
    priceGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    priceInputContainer: {
        width: '48%',
    },
    priceLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    priceInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },

    // Estilos para Contadores (+1)
    counterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    counterButton: {
        backgroundColor: '#F0F8FF', 
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    counterButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#146fba',
    },
    counterValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 40,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    // Estilos dos Botões de Ação (Limpar/Aplicar)
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
        borderTopWidth: 1, 
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    actionButton: {
        flex: 1,
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#146fba',
    },
    applyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    clearButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    clearButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 15,
    }
});