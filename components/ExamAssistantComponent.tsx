import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function ExamAssistantComponent() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
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

      const botMsg = { role: "bot", text: data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          {/* TITLE */}
          <Text style={styles.title}>📚 Exam Assistant</Text>
          <Text style={styles.subtitle}>
            Plan smarter, study better
          </Text>

          {/* CARD 1 */}
          <TouchableOpacity
            style={[styles.card, styles.gradientPink]}
            onPress={() => router.push("/study-plan")}
          >
            <Text style={styles.icon}>📅</Text>
            <View>
              <Text style={styles.cardTitle}>Generate Study Plan</Text>
              <Text style={styles.cardDesc}>
                AI-based personalized schedule
              </Text>
            </View>
          </TouchableOpacity>

          {/* CARD 2 */}
          <TouchableOpacity
            style={[styles.card, styles.gradientBlue]}
            onPress={() => router.push("/daily-protocol")}
          >
            <Text style={styles.icon}>🧠</Text>
            <View>
              <Text style={styles.cardTitle}>Daily Study Protocol</Text>
              <Text style={styles.cardDesc}>
                Build powerful study habits
              </Text>
            </View>
          </TouchableOpacity>

          {/* CARD 3 */}
          <TouchableOpacity
            style={[styles.card, styles.gradientYellow]}
            onPress={() => router.push("/video-hacks")}
          >
            <Text style={styles.icon}>🎥</Text>
            <View>
              <Text style={styles.cardTitle}>Study Hack Videos</Text>
              <Text style={styles.cardDesc}>
                Learn faster with smart tricks
              </Text>
            </View>
          </TouchableOpacity>

          {/* CHAT SECTION */}
          <Text style={styles.chatTitle}>💬 Ask AI</Text>

          <View style={styles.chatBox}>
            {chat.map((msg, i) => (
              <Text
                key={i}
                style={msg.role === "user" ? styles.user : styles.bot}
              >
                {msg.text}
              </Text>
            ))}
          </View>

          <View style={styles.inputBox}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Ask something..."
              style={styles.input}
            />

            <TouchableOpacity onPress={sendMessage} style={styles.button}>
              <Text style={{ color: "#fff" }}>Send</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    color: "#555",
    marginBottom: 25,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 25,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },

  gradientPink: {
    backgroundColor: "rgba(247,168,168,0.95)",
  },
  gradientBlue: {
    backgroundColor: "rgba(168,191,247,0.95)",
  },
  gradientYellow: {
    backgroundColor: "rgba(247,215,168,0.95)",
  },

  icon: {
    fontSize: 30,
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },

  cardDesc: {
    fontSize: 13,
    color: "#fff",
    marginTop: 4,
    opacity: 0.9,
  },

  chatTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  chatBox: {
    maxHeight: 200,
    marginTop: 10,
  },

  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },

  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#EEE",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },

  inputBox: {
    flexDirection: "row",
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "blue",
    padding: 10,
    marginLeft: 5,
    borderRadius: 10,
  },
});