import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    useEffect(() => {
        carregarUsuario();
    }, []);

    useEffect(() => {
        if (isEdit && token) carregarVisita();
    }, [token]);

    const carregarUsuario = async () => {
        const userStorage = await AsyncStorage.getItem("userData");
        const tokenStorage = await AsyncStorage.getItem("userToken");

        if (!userStorage || !tokenStorage) {
            alert("Você precisa estar logado!");
            router.push("/login");
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
    };

    const carregarVisita = async () => {
        setLoadingData(true);
        try {
            const res = await fetch(`http://localhost:3100/agenda/${editId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();

            setFormData({
                nome: data.usuario?.nome || "",
                email: data.usuario?.email || "",
                dataVisita: data.dataVisita.split("T")[0],
                horario: data.horario,
                observacoes: data.observacoes || ""
            });

            setTelefone(formatarTelefone(data.telefone));
        } catch (err) {
            alert("Erro ao carregar dados");
        }
        setLoadingData(false);
    };

    const formatarTelefone = (valor) => {
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

    const salvar = async () => {
        if (!formData.dataVisita || !formData.horario || !telefone) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        setLoading(true);

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

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        setLoading(false);

        if (res.ok) {
            alert(isEdit ? "Visita atualizada!" : "Visita agendada!");
            router.push("/visitas");
        } else {
            alert("Erro ao salvar.");
        }
    };

    if (loadingData) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#146FBA" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>
                {isEdit ? "Editar Visita" : "Agendar Visita"}
            </Text>

            <View style={styles.formContainer}>
                <TextInput style={styles.input} value={formData.nome} editable={false} />
                <TextInput style={styles.input} value={formData.email} editable={false} />

                {/* DATA */}
                {Platform.OS === "web" ? (
                    <input
                        type="date"
                        style={styles.webInput}
                        value={formData.dataVisita}
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
                            <Text>{formData.dataVisita || "Selecione a data"}</Text>
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

                {/* HORÁRIO */}
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
                            <Text>{formData.horario || "Selecione o horário"}</Text>
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

                {/* TELEFONE */}
                <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={(t) => setTelefone(formatarTelefone(t))}
                />

                {/* OBSERVAÇÕES */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Observações"
                    multiline
                    value={formData.observacoes}
                    onChangeText={(t) =>
                        setFormData({ ...formData, observacoes: t })
                    }
                />

                {/* BOTÃO */}
                <TouchableOpacity style={styles.button} onPress={salvar}>
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isEdit ? "Salvar Alterações" : "Agendar"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        padding: 15,
        backgroundColor: "#E3F2FF",
        color: "#146FBA",
        marginBottom: 20,
    },
    formContainer: { paddingHorizontal: 20 },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#84C4FB",
        padding: 12,
        borderRadius: 6,
        marginBottom: 15,
    },
    webInput: {
        width: "100%",
        padding: 12,
        borderWidth: 2,
        borderColor: "#84C4FB",
        borderRadius: 6,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#146FBA",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    }
});
