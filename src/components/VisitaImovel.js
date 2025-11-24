import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalMensagem from "./ModalMensagem";

export default function VisitaImovel({ visita, onCancel }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMsg, setModalMsg] = useState({ visible: false, title: '', message: '' });

    const showAlert = (title, message) => {
        setModalMsg({ visible: true, title, message });
    };

    const blurActiveElement = () => {
        if (typeof document !== "undefined" && document.activeElement) {
            try {
                document.activeElement.blur();
            } catch {}
        }
    };

    if (!visita) {
        return (
            <View style={styles.card}>
                <Text style={{ color: "#888" }}>Carregando...</Text>
            </View>
        );
    }

    const imovel = visita.imovel || {};

    const formatData = (data) => {
        if (!data) return "--/--/----";
        const d = new Date(data);
        return d.toLocaleDateString("pt-BR");
    };

    const formatTelefone = (tel) => {
        if (!tel) return "--";
        tel = tel.replace(/\D/g, "");
        if (tel.length === 11) {
            return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
        return tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    };

    const getStatusColor = (status) => {
        const colors = {
            pendente: "#FFA500",
            confirmado: "#4CAF50",
            recusado: "#F44336",
            cancelado: "#9E9E9E",
        };
        return colors[status] || "#777";
    };

    // 🔥 EXCLUIR VISITA DE VERDADE (DELETE)
    const confirmarCancelamento = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            const response = await fetch(`http://localhost:3100/agenda/${visita.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setModalVisible(false);

                // 🔥 remove instantaneamente do front
                if (onCancel) onCancel(visita.id);

                return;
            }

            showAlert("Erro", "Erro ao cancelar visita");
        } catch (error) {
            console.log(error);
            showAlert("Erro", "Ocorreu um erro interno. Tente novamente.");
        }
    };

    return (
        <View style={styles.card}>

            <ModalMensagem
                visible={modalMsg.visible}
                title={modalMsg.title}
                message={modalMsg.message}
                onConfirm={() => setModalMsg({ visible: false, title: '', message: '' })}
            />
            {/* FOTO */}
            {imovel.foto ? (
                <Image source={{ uri: imovel.foto }} style={styles.foto} />
            ) : (
                <View style={[styles.foto, styles.fotoPlaceholder]}>
                    <Text style={{ color: "#999" }}>Sem imagem</Text>
                </View>
            )}

            {/* TÍTULO */}
            <Text style={styles.titulo}>{imovel.titulo || "Imóvel sem título"}</Text>

            {/* DATA + HORA */}
            <View style={styles.row}>
                <Text style={styles.label}>📅 {formatData(visita.dataVisita)}</Text>
                <Text style={styles.label}>🕒 {visita.horario || "--:--"}</Text>
            </View>

            {/* TELEFONE */}
            <Text style={styles.label}>📞 {formatTelefone(visita.telefone)}</Text>

            {/* OBSERVAÇÕES */}
            <Text style={styles.obsTitle}>📝 Observações:</Text>
            <Text style={styles.obsText}>
                {visita.observacoes || "Nenhuma observação"}
            </Text>

            {/* STATUS */}
            <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(visita.status) }]} />
                <Text style={styles.statusText}>{visita.status}</Text>
            </View>

            {/* BOTÕES */}
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnEdit]}
                    onPress={() => router.push(`/agendamento?edit=${visita.id}`)}
                >
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.btnCancel]}
                    onPress={() => {
                        blurActiveElement();
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Cancelar visita?</Text>
                        <Text style={styles.modalText}>
                            Tem certeza que deseja cancelar esta visita?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.cancelarBtn]}
                                onPress={confirmarCancelamento}
                            >
                                <Text style={styles.modalBtnText}>Sim, cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalBtn, styles.voltarBtn]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalBtnText}>Voltar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        marginBottom: 20,
    },

    foto: {
        width: "100%",
        height: 160,
        borderRadius: 12,
        marginBottom: 10,
    },

    fotoPlaceholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
    },

    titulo: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    label: {
        fontSize: 15,
        color: "#555",
        marginBottom: 4,
    },

    obsTitle: {
        fontWeight: "bold",
        marginTop: 8,
        color: "#444",
    },

    obsText: {
        backgroundColor: "#eee",
        padding: 6,
        borderRadius: 6,
        marginBottom: 10,
        marginTop: 3,
        color: "#555",
    },

    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginRight: 8,
    },

    statusText: {
        fontSize: 15,
        color: "#333",
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    btnEdit: {
        backgroundColor: "#146FBA",
        marginRight: 10,
    },

    btnCancel: {
        backgroundColor: "#6C757D",
    },

    btnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "500",
    },

    /* MODAL */
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },

    modalText: {
        textAlign: "center",
        marginBottom: 20,
        color: "#555",
    },

    modalButtons: {
        flexDirection: "row",
        gap: 10,
    },

    modalBtn: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    cancelarBtn: {
        backgroundColor: "#d9534f",
    },

    voltarBtn: {
        backgroundColor: "#6c757d",
    },

    modalBtnText: {
        color: "#fff",
        fontWeight: "600",
    },
});
