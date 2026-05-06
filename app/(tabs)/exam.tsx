import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function ExamAssistant() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { id: Date.now(), role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("https://ai-study-planner-backend-zi9t.onrender.com/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: data.reply,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F6FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Exam Assistant</Text>
        <Text style={styles.headerSub}>Plan smarter, study better</Text>
      </View>

      {/* FEATURE CARDS */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FF9A9E" }]}
          onPress={() => router.push("/study-plan")}
        >
          <Text style={styles.cardTitle}>📅 Study Plan</Text>
          <Text style={styles.cardDesc}>AI-based schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#89CFF0" }]}
          onPress={() => router.push("/daily-protocol")}
        >
          <Text style={styles.cardTitle}>🧠 Daily Protocol</Text>
          <Text style={styles.cardDesc}>Build habits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: "#FFD580" }]}
        >
          <Text style={styles.cardTitle}>🎥 Study Hacks</Text>
          <Text style={styles.cardDesc}>Learn faster</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT */}
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>💬 Ask AI</Text>

        <FlatList
          data={chat}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.role === "user" ? styles.userMsg : styles.botMsg,
              ]}
            >
              <Text>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ask something..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#8B1E1E",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#fff",
    marginTop: 5,
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  card: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
  },

  cardTitle: {
    fontWeight: "bold",
    color: "#fff",
  },

  cardDesc: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },

  chatTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },

  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },

  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
  },

  sendBtn: {
    backgroundColor: "#8B1E1E",
    marginLeft: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10,
  },
});