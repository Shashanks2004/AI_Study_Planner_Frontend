import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

export default function DailyProtocol() {
const [activeView, setActiveView] = useState("web-dashboard");

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.25 }} // visible but soft
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* TITLE */}
        <Text style={styles.title}>🧠 Daily Protocol</Text>
        <Text style={styles.subtitle}>
          Build a powerful daily study routine
        </Text>

        {/* MORNING */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌅 Morning</Text>
          <Text style={styles.item}>• Revise previous topics</Text>
          <Text style={styles.item}>• Quick concept recap</Text>
        </View>

        {/* AFTERNOON */}
        <View style={[styles.card, styles.blue]}>
          <Text style={styles.cardTitle}>☀️ Afternoon</Text>
          <Text style={styles.item}>• Learn new concepts</Text>
          <Text style={styles.item}>• Practice examples</Text>
        </View>

        {/* NIGHT */}
        <View style={[styles.card, styles.yellow]}>
          <Text style={styles.cardTitle}>🌙 Night</Text>
          <Text style={styles.item}>• Practice questions</Text>
          <Text style={styles.item}>• Review mistakes</Text>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },

  blue: {
    backgroundColor: "rgba(168,191,247,0.85)",
  },

  yellow: {
    backgroundColor: "rgba(247,215,168,0.85)",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  item: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
});