import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useDashboard } from "../../hooks/useDashboard";
import { saveSyllabus, toggleTopic } from "../../services/api";

export default function Dashboard() {
  const { syllabusList, fetchSyllabus } = useDashboard();

  const [subjectName, setSubjectName] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [countdown, setCountdown] = useState("");

  // 🔥 Load data when screen opens
  useEffect(() => {
    fetchSyllabus();
  }, []);

  // ➕ Add topic
  const addTopic = () => {
    if (!topicInput) return;
    setTopics([...topics, topicInput]);
    setTopicInput("");
  };

  // 💾 Save syllabus
  const handleSave = async () => {
    if (!subjectName || topics.length === 0) return;

    await saveSyllabus({
      subject: subjectName,
      topics,
    });

    setTopics([]);
    setSubjectName("");

    fetchSyllabus(); // 🔥 refresh UI
  };

  // 📊 Exam
  const handleAddExam = async () => {
    try {
      const res = await fetch("https://ai-study-planner-backend-zi9t.onrender.com/exam-countdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examDate }),
      });

      const data = await res.json();
      setCountdown(`${subject}: ${data.message}`);
    } catch {
      setCountdown("Error getting countdown");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* 📊 EXAM ASSISTANT */}
      <View style={styles.card}>
        <Text style={styles.title}>📊 Exam Assistant</Text>

        <TextInput
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
          style={styles.input}
        />

        <TextInput
          placeholder="YYYY-MM-DD"
          value={examDate}
          onChangeText={setExamDate}
          style={styles.input}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleAddExam}>
          <Text style={styles.btnText}>Add Exam</Text>
        </TouchableOpacity>

        {countdown ? (
          <Text style={styles.countdown}>{countdown}</Text>
        ) : null}
      </View>

      {/* 📚 SYLLABUS TRACKER */}
      <View style={styles.card}>
        <Text style={styles.title}>📚 Syllabus Tracker</Text>

        <TextInput
          placeholder="Subject"
          value={subjectName}
          onChangeText={setSubjectName}
          style={styles.input}
        />

        <TextInput
          placeholder="Add Topic"
          value={topicInput}
          onChangeText={setTopicInput}
          style={styles.input}
        />

        <TouchableOpacity onPress={addTopic} style={styles.secondaryBtn}>
          <Text style={styles.btnText}>Add Topic</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave} style={styles.primaryBtn}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>

        {/* SUBJECT LIST */}
        {syllabusList.map((item: any) => {
          const total = item.topics.length;
          const completed = item.topics.filter((t: any) => t.completed).length;
          const percent =
            total === 0 ? 0 : Math.round((completed / total) * 100);

          return (
            <View key={item._id} style={styles.subjectCard}>
              <Text style={styles.subjectTitle}>
                {item.subject} ({percent}%)
              </Text>

              {/* PROGRESS BAR */}
              <View style={styles.progressBg}>
                <View
                  style={[styles.progressFill, { width: `${percent}%` }]}
                />
              </View>

              {/* REVISION */}
              

              {/* TOPICS */}
              {item.topics.map((t: any) => (
                <TouchableOpacity
                  key={t._id}
                  onPress={async () => {
                    await toggleTopic(item._id, t._id);
                    fetchSyllabus(); // 🔥 refresh
                  }}
                >
                  <Text
                    style={{
                      marginTop: 6,
                      padding: 8,
                      borderRadius: 8,
                      backgroundColor: t.completed ? "#e0e0e0" : "#fff",
                      textDecorationLine: t.completed
                        ? "line-through"
                        : "none",
                      color: t.completed ? "gray" : "black",
                    }}
                  >
                    {t.completed ? "✅" : "⬜"} {t.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  header: {
    backgroundColor: "#8B1E1E",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  primaryBtn: {
    backgroundColor: "#8B1E1E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  secondaryBtn: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  countdown: {
    marginTop: 10,
    fontWeight: "bold",
  },

  subjectCard: {
    marginTop: 15,
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 12,
  },

  subjectTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#e8a1a1",
  },

  revisionBtn: {
    marginTop: 8,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});