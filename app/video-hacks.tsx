import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function VideoHacks() {
  const [activeView, setActiveView] = useState("web-dashboard");
  const videos = [
    {
      title: "How to Study Effectively",
      url: "https://www.youtube.com/embed/IlU-zDU6aQ0",
    },
    {
      title: "Best Study Techniques",
      url: "https://www.youtube.com/embed/ukLnPbIffxE",
    },
    {
      title: "Pomodoro Technique",
      url: "https://www.youtube.com/embed/mNBmG24djoY",
    },
    {
      title: "Avoid Burnout",
      url: "https://www.youtube.com/embed/8jPQjjsBbIc",
    },
    {
      title: "Active Recall",
      url: "https://www.youtube.com/embed/fDbxPVn02VU",
    },
    {
      title: "Spaced Repetition",
      url: "https://www.youtube.com/embed/Z-zNHHpXoMM",
    },
    {
      title: "Exam Strategy",
      url: "https://www.youtube.com/embed/CPxSzxylRCI",
    },
    {
      title: "When to Take Breaks",
      url: "https://www.youtube.com/embed/6o2tm00Ar8A",
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.3 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎥 Study Hack Videos</Text>
        <Text style={styles.subtitle}>
          Learn smarter with proven techniques
        </Text>

        {videos.map((video, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.videoTitle}>{video.title}</Text>

            {/* 👇 THIS WORKS ON WEB */}
            <iframe
              src={video.url}
              style={{
                width: "100%",
                height: 220,
                borderRadius: 12,
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },

  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});