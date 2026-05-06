import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";

import { auth } from "../config/firebase";
import ExamAssistantComponent from "../components/ExamAssistantComponent";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  // ================= EXAM =================
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [countdown, setCountdown] = useState("");

  // ================= SYLLABUS =================
  const [subjectName, setSubjectName] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [syllabusList, setSyllabusList] = useState<any[]>([]);

  // ================= FETCH =================
  const fetchSyllabus = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const res = await fetch(
        `https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus?userId=${userId}`
      );

      const data = await res.json();
      setSyllabusList(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  // ================= EXAM =================
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

  // ================= ADD TOPIC =================
  const addTopic = () => {
    if (!topicInput) return;
    setTopics([...topics, topicInput]);
    setTopicInput("");
  };

  // ================= SAVE =================
  const saveSyllabus = async () => {
    try {
      const userId = auth.currentUser?.uid;

      await fetch("https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subjectName,
          topics,
          userId,
        }),
      });

      setTopics([]);
      setSubjectName("");
      fetchSyllabus();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // ================= TOGGLE =================
  const toggleTopic = async (id: string, topicId: string) => {
    try {
      console.log("TOGGLE CLICK:", id, topicId);

      await fetch(
        `https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus/${id}/${topicId}`,
        {
          method: "PUT",
        }
      );

      fetchSyllabus();
    } catch (err) {
      console.log("Toggle error:", err);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* LEFT PANEL */}
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.inboxBtn}>
          <Text style={styles.inboxText}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addTask}>
          <Text>Add task...</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Thoughts</Text>
        <Text style={styles.sectionDesc}>
          Capture tasks and organize later.
        </Text>

        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => setActiveView("exam")}
        >
          <Text>Open Exam Assistant</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN */}
      <ScrollView style={styles.main}>
        <ImageBackground
          source={require("../assets/images/bg.png")}
          style={styles.background}
        >
          {activeView === "dashboard" ? (
            <>
              <Text style={styles.month}>Dashboard</Text>

              {/* SYLLABUS */}
              <View style={{ padding: 15 }}>
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

                <TouchableOpacity onPress={addTopic} style={styles.addBtn}>
                  <Text style={styles.btnText}>Add Topic</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveSyllabus} style={styles.addBtn}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>

                {syllabusList.map((item) => {
                  const total = item.topics.length;
                  const completed = item.topics.filter(
                    (t: any) => t.completed
                  ).length;
                  const percent =
                    total === 0
                      ? 0
                      : Math.round((completed / total) * 100);

                  return (
                    <View key={item._id} style={styles.card}>
                      <Text style={styles.subject}>
                        {item.subject} ({percent}%)
                      </Text>

                      {/* PROGRESS */}
                      <View style={styles.progressBg}>
                        <View
                          style={[styles.progressFill, { width: `${percent}%` }]}
                        />
                      </View>

                      {/* TOPICS */}
                      {item.topics.map((t: any) => (
                        <TouchableOpacity
                          key={t._id}
                          onPress={() =>
                            toggleTopic(item._id, t._id)
                          }
                        >
                          <Text
                            style={{
                              marginTop: 6,
                              padding: 8,
                              borderRadius: 8,
                              backgroundColor: t.completed
                                ? "#e0e0e0"
                                : "#fff",
                              textDecorationLine: t.completed
                                ? "line-through"
                                : "none",
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
            </>
          ) : (
            <ExamAssistantComponent />
          )}
        </ImageBackground>
      </ScrollView>

      {/* RIGHT PANEL */}
      <View style={styles.rightPanel}>
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

        <TouchableOpacity style={styles.addBtn} onPress={handleAddExam}>
          <Text style={styles.btnText}>Add Exam</Text>
        </TouchableOpacity>

        {countdown ? (
          <Text style={{ marginTop: 10 }}>{countdown}</Text>
        ) : null}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  sidebar: { width: 250, padding: 15, backgroundColor: "#f5f5f5" },
  inboxBtn: {
    backgroundColor: "#7f1d1d",
    padding: 10,
    borderRadius: 20,
  },
  inboxText: { color: "#fff", textAlign: "center" },
  addTask: {
    borderWidth: 1,
    borderColor: "#7f1d1d",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  sectionTitle: { marginTop: 10, fontWeight: "bold" },
  sectionDesc: { fontSize: 12 },
  openBtn: { marginTop: 10, borderWidth: 1, padding: 8 },

  main: { flex: 1 },
  background: { flex: 1, padding: 20 },

  rightPanel: { width: 250, padding: 15, backgroundColor: "#f5f5f5" },

  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#7f1d1d",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  subject: { fontWeight: "bold" },

  progressBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#e8a1a1",
  },
});