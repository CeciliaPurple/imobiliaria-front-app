import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import BotaoSelecao from './BotaoSelecao';

// DADOS PARA OS FILTROS - MESMOS DO WEB
const TIPOS_IMOVEIS = ['Casa', 'Apartamento', 'Cobertura', 'Loft', 'Sítio', 'Flat'];
const AMBIENTES = [
    'Área de Serviços',
    'Área Gourmet', 
    'Closet', 
    'Escritório', 
    'Jardim', 
    'Lavanderia', 
    'Piscina', 
    'Quintal',
    'Sala integrada'
];
const CONVENIENCIAS = [
    'Academia',
    'Ar-condicionado', 
    'Armários Planejados', 
    'Hidromassagem', 
    'Mobiliado',
    'Segurança 24h'
];

export default function ModalFiltros({ visible, onClose, onApply, filtrosIniciais }) {
    
    const [filtros, setFiltros] = useState(filtrosIniciais);

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

    // Para tipos (seleção única transformada em array)
    const handleSingleSelect = (campo, valor) => {
        const listaAtual = filtros[campo];
        const novaLista = listaAtual.includes(valor)
            ? listaAtual.filter(item => item !== valor)
            : [...listaAtual, valor];
        handleInputChange(campo, novaLista);
    };

    // Para múltipla seleção (ambientes, conveniências)
    const handleMultipleSelect = (campo, valor) => {
        const listaAtual = filtros[campo];
        const novaLista = listaAtual.includes(valor)
            ? listaAtual.filter(item => item !== valor)
            : [...listaAtual, valor];
            
        handleInputChange(campo, novaLista);
    };

    // Para quartos, banheiros, vagas (checkboxes com números)
    const handleNumberCheckbox = (campo, numero) => {
        const listaAtual = filtros[campo];
        const novaLista = listaAtual.includes(numero)
            ? listaAtual.filter(item => item !== numero)
            : [...listaAtual, numero];
        handleInputChange(campo, novaLista);
    };

    const formatarPreco = (valor) => {
        const numeros = valor.replace(/\D/g, '');
        const numero = Number(numeros);
        if (numero === 0) return '';
        return numero.toLocaleString('pt-BR');
    };

    const handlePrecoChange = (campo, texto) => {
        const numeros = texto.replace(/\D/g, '');
        handleInputChange(campo, numeros);
    };

    const handleApplyPress = () => {
        console.log('📋 Filtros a serem aplicados:', filtros);
        onApply(filtros);
    };

    const handleClearAndClose = () => {
        console.log('🗑️ Limpando filtros do modal');
        const filtrosVazios = {
            localizacao: '',
            tipos: [],
            precoMin: '',
            precoMax: '',
            quartos: [],
            banheiros: [],
            vagas: [],
            ambientes: [],
            conveniencias: []
        };
        onApply(filtrosVazios);
    };

    // Componente para checkboxes de números (quartos, banheiros, vagas)
    const NumberCheckboxGroup = ({ label, campo, opcoes = [1, 2, 3, 4, 5] }) => (
        <View style={modalStyles.numberContainer}>
            <Text style={modalStyles.sectionTitle}>{label}</Text>
            <View style={modalStyles.numberGroup}>
                {opcoes.map(num => (
                    <Pressable
                        key={num}
                        style={[
                            modalStyles.numberButton,
                            filtros[campo].includes(num) && modalStyles.numberButtonSelected
                        ]}
                        onPress={() => handleNumberCheckbox(campo, num)}
                    >
                        <Text style={[
                            modalStyles.numberButtonText,
                            filtros[campo].includes(num) && modalStyles.numberButtonTextSelected
                        ]}>
                            {num === 5 ? '+5' : `+${num}`}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );

    return (
        <Modal
            animationType="slide"
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

                    <ScrollView style={modalStyles.scrollViewContent} showsVerticalScrollIndicator={false}>
                        
                        {/* LOCALIZAÇÃO */}
                        <Text style={modalStyles.sectionTitle}>Localização</Text>
                        <TextInput 
                            style={modalStyles.input} 
                            placeholder="Digite bairro, cidade..."
                            value={filtros.localizacao}
                            onChangeText={(text) => handleInputChange('localizacao', text)}
                        />

                        {/* TIPOS DE IMÓVEIS */}
                        <Text style={modalStyles.sectionTitle}>Tipos de Imóveis</Text>
                        <View style={modalStyles.buttonGroup}>
                            {TIPOS_IMOVEIS.map(tipo => (
                                <BotaoSelecao 
                                    key={tipo}
                                    label={tipo}
                                    isSelected={filtros.tipos.includes(tipo)}
                                    onPress={() => handleSingleSelect('tipos', tipo)}
                                />
                            ))}
                        </View>

                        {/* PREÇO */}
                        <Text style={modalStyles.sectionTitle}>Faixa de Preço</Text>
                        <View style={modalStyles.priceGroup}>
                            <View style={modalStyles.priceInputContainer}>
                                <Text style={modalStyles.priceLabel}>A partir de</Text>
                                <View style={modalStyles.priceInputWrapper}>
                                    <Text style={modalStyles.pricePrefix}>R$</Text>
                                    <TextInput 
                                        style={modalStyles.priceInput} 
                                        keyboardType="numeric"
                                        placeholder="0"
                                        value={filtros.precoMin ? formatarPreco(filtros.precoMin) : ''}
                                        onChangeText={(text) => handlePrecoChange('precoMin', text)}
                                    />
                                </View>
                            </View>
                            <View style={modalStyles.priceInputContainer}>
                                <Text style={modalStyles.priceLabel}>Até</Text>
                                <View style={modalStyles.priceInputWrapper}>
                                    <Text style={modalStyles.pricePrefix}>R$</Text>
                                    <TextInput 
                                        style={modalStyles.priceInput} 
                                        keyboardType="numeric"
                                        placeholder="0"
                                        value={filtros.precoMax ? formatarPreco(filtros.precoMax) : ''}
                                        onChangeText={(text) => handlePrecoChange('precoMax', text)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* QUARTOS */}
                        <NumberCheckboxGroup label="Quartos" campo="quartos" />

                        {/* BANHEIROS */}
                        <NumberCheckboxGroup label="Banheiros" campo="banheiros" />

                        {/* VAGAS */}
                        <NumberCheckboxGroup label="Vagas" campo="vagas" />

                        {/* AMBIENTES */}
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

                        {/* CONVENIÊNCIAS */}
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
                            <Ionicons name="trash-outline" size={18} color="#333" />
                            <Text style={modalStyles.clearButtonText}>Limpar</Text>
                        </Pressable>
                        <Pressable 
                            style={[modalStyles.actionButton, modalStyles.applyButton]}
                            onPress={handleApplyPress}
                        >
                            <Ionicons name="checkmark-circle" size={18} color="#fff" />
                            <Text style={modalStyles.applyButtonText}>Aplicar</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',     
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    },
    modalView: {
        backgroundColor: 'white',
        padding: 15,
        width: '85%', 
        height: '100%', 
        margin: 0,
        borderRadius: 0, 
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 }, 
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    
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

    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },

    priceGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10,
    },
    priceInputContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    priceInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
    },
    pricePrefix: {
        fontSize: 16,
        color: '#146fba',
        fontWeight: '600',
        marginRight: 5,
    },
    priceInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        padding: 0,
    },

    // Estilos para checkboxes de números
    numberContainer: {
        marginBottom: 15,
    },
    numberGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    numberButton: {
        backgroundColor: '#F0F8FF',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        minWidth: 50,
        alignItems: 'center',
    },
    numberButtonSelected: {
        backgroundColor: '#146fba',
        borderColor: '#146fba',
    },
    numberButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#146fba',
    },
    numberButtonTextSelected: {
        color: '#fff',
    },

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
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
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