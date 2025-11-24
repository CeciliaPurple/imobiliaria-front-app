import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalMensagem from "../components/ModalMensagem";

export default function Agenda() {
    const { imovel, edit } = useLocalSearchParams();
    const imovelId = imovel ? Number(imovel) : null;
    const editId = edit ? Number(edit) : null;
    const isEdit = !!editId;

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        dataVisita: "",
        horario: "",
        observacoes: ""
    });
    const [telefone, setTelefone] = useState("");
    const [modal, setModal] = useState({ visible: false, title: '', message: '' });

    const showAlert = (title, message, onConfirm) => {
        setModal({ visible: true, title, message, onConfirm });
    };

    useEffect(() => {
        carregarUsuario();
    }, []);

    useEffect(() => {
        if (isEdit && token) {
            carregarVisita();
        }
    }, [token]);

    const carregarUsuario = async () => {
        try {
            const userStorage = await AsyncStorage.getItem("userData");
            const tokenStorage = await AsyncStorage.getItem("userToken");

            if (!userStorage || !tokenStorage) {
                showAlert("Acesso Negado", "Você precisa estar logado para agendar uma visita.", () => {
                    setModal({ visible: false });
                    router.push("/login");
                });
                return;
            }

            const userObj = JSON.parse(userStorage);
            setUser(userObj);
            setToken(tokenStorage);

            setFormData(prev => ({
                ...prev,
                nome: userObj.nome,
                email: userObj.email
            }));
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            showAlert("Erro", "Erro ao carregar dados do usuário.");
        }
    };

    const carregarVisita = async () => {
        if (!token) return;
        
        setLoadingData(true);
        try {
            const response = await fetch(`http://localhost:3100/agenda/${editId}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao carregar visita');
            }

            const result = await response.json();
            
            console.log('📊 Dados recebidos da API:', result);

            // A API retorna um objeto com 'agendamentos' dentro
            const data = result.agendamentos || result;

            // Preencher o formulário com os dados recebidos
            setFormData({
                nome: data.usuario?.nome || user?.nome || "",
                email: data.usuario?.email || user?.email || "",
                dataVisita: data.dataVisita ? data.dataVisita.split("T")[0] : "",
                horario: data.horario || "",
                observacoes: data.observacoes || ""
            });

            // Preencher o telefone formatado
            if (data.telefone) {
                setTelefone(formatarTelefone(data.telefone));
            }

            // Atualizar o selectedDate para o DatePicker
            if (data.dataVisita) {
                setSelectedDate(new Date(data.dataVisita));
            }

        } catch (err) {
            console.error('Erro ao carregar visita:', err);
            showAlert("Erro", `Erro ao carregar dados da visita: ${err.message}`, () => {
                setModal({ visible: false });
                router.back();
            });
        } finally {
            setLoadingData(false);
        }
    };

    const formatarTelefone = (valor) => {
        if (!valor) return "";
        
        let tel = valor.replace(/\D/g, "");
        if (tel.length > 11) tel = tel.slice(0, 11);

        if (tel.length <= 10)
            return tel.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");

        return tel.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    };

    const onDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            setFormData(prev => ({ ...prev, dataVisita: date.toISOString().split("T")[0] }));
        }
    };

    const onTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) {
            const h = String(time.getHours()).padStart(2, "0");
            const m = String(time.getMinutes()).padStart(2, "0");
            setFormData(prev => ({ ...prev, horario: `${h}:${m}` }));
        }
    };

    const validarFormulario = () => {
        if (!formData.dataVisita) {
            showAlert("Campos Incompletos", "Selecione uma data para a visita!");
            return false;
        }

        if (!formData.horario) {
            showAlert("Campos Incompletos", "Selecione um horário para a visita!");
            return false;
        }

        if (!telefone || telefone.replace(/\D/g, "").length < 10) {
            showAlert("Campos Incompletos", "Digite um telefone válido!");
            return false;
        }

        return true;
    };

    const salvar = async () => {
        if (!validarFormulario()) return;

        setLoading(true);

        try {
            const payload = {
                usuarioId: user.id,
                imovelId,
                dataVisita: new Date(formData.dataVisita).toISOString(),
                horario: formData.horario,
                telefone: telefone.replace(/\D/g, ""),
                observacoes: formData.observacoes,
                status: "pendente"
            };

            const url = isEdit
                ? `http://localhost:3100/agenda/${editId}`
                : "http://localhost:3100/agenda";

            const method = isEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const successMessage = isEdit ? "Visita atualizada com sucesso!" : "Visita agendada com sucesso!";
                showAlert("Sucesso", successMessage, () => {
                    setModal({ visible: false });
                    router.push("/visitas");
                });
            } else {
                const data = await response.json();
                throw new Error(data.message || "Erro ao salvar");
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            showAlert("Erro", error.message || "Não foi possível salvar a visita.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#146FBA" />
                <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <ModalMensagem
                visible={modal.visible}
                title={modal.title}
                message={modal.message}
                onConfirm={modal.onConfirm || (() => setModal({ visible: false }))}
            />
            
            <Text style={styles.titulo}>
                {isEdit ? "Editar Visita" : "Agendar Visita"}
            </Text>

            <View style={styles.formContainer}>
                {/* NOME (somente leitura) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput 
                        style={[styles.input, styles.inputDisabled]} 
                        value={formData.nome} 
                        editable={false} 
                    />
                </View>

                {/* EMAIL (somente leitura) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={[styles.input, styles.inputDisabled]} 
                        value={formData.email} 
                        editable={false} 
                    />
                </View>

                {/* DATA */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data da Visita *</Text>
                    {Platform.OS === "web" ? (
                        <input
                            type="date"
                            style={styles.webInput}
                            value={formData.dataVisita}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                                setFormData({ ...formData, dataVisita: e.target.value })
                            }
                        />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={formData.dataVisita ? styles.inputText : styles.placeholder}>
                                    {formData.dataVisita || "Selecione a data"}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    onChange={onDateChange}
                                    minimumDate={new Date()}
                                />
                            )}
                        </>
                    )}
                </View>

                {/* HORÁRIO */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Horário *</Text>
                    {Platform.OS === "web" ? (
                        <input
                            type="time"
                            style={styles.webInput}
                            value={formData.horario}
                            onChange={(e) =>
                                setFormData({ ...formData, horario: e.target.value })
                            }
                        />
                    ) : (
                        <>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowTimePicker(true)}
                            >
                                <Text style={formData.horario ? styles.inputText : styles.placeholder}>
                                    {formData.horario || "Selecione o horário"}
                                </Text>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={onTimeChange}
                                />
                            )}
                        </>
                    )}
                </View>

                {/* TELEFONE */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(00) 00000-0000"
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={(t) => setTelefone(formatarTelefone(t))}
                        maxLength={15}
                    />
                </View>

                {/* OBSERVAÇÕES */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Observações</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Adicione observações sobre a visita..."
                        multiline
                        numberOfLines={4}
                        value={formData.observacoes}
                        onChangeText={(t) =>
                            setFormData({ ...formData, observacoes: t })
                        }
                        textAlignVertical="top"
                    />
                </View>

                {/* BOTÃO */}
                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]} 
                    onPress={salvar}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isEdit ? "Salvar Alterações" : "Agendar"}
                        </Text>
                    )}
                </TouchableOpacity>

                {/* Nota */}
                <Text style={styles.nota}>* Campos obrigatórios</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#F5F5F5" 
    },
    center: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "#F5F5F5"
    },
    loadingText: {
        marginTop: 10,
        color: "#375A76",
        fontSize: 16
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        padding: 15,
        backgroundColor: "#E3F2FF",
        color: "#146FBA",
        marginBottom: 20,
    },
    formContainer: { 
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    inputGroup: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#375A76",
        marginBottom: 6
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#84C4FB",
        padding: 12,
        borderRadius: 6,
        fontSize: 16,
        color: "#375A76"
    },
    inputDisabled: {
        backgroundColor: "#F0F0F0",
        color: "#999"
    },
    inputText: {
        color: "#375A76",
        fontSize: 16
    },
    placeholder: {
        color: "#999",
        fontSize: 16
    },
    webInput: {
        width: "100%",
        padding: 12,
        borderWidth: 2,
        borderColor: "#84C4FB",
        borderRadius: 6,
        fontSize: 16,
        backgroundColor: "#FFF"
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
        paddingTop: 12
    },
    button: {
        backgroundColor: "#146FBA",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    buttonDisabled: {
        opacity: 0.7
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    nota: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
        marginTop: 10,
        textAlign: "center"
    }
});