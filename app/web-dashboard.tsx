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
  /* MAIN CONTAINER */
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
  },

  /* LEFT SIDEBAR */
  sidebar: {
    width: 240,
    padding: 18,
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e5e5e5",
  },

  inboxBtn: {
    backgroundColor: "#7f1d1d",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  inboxText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  addTask: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
  },

  sectionTitle: {
    marginTop: 10,
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },

  sectionDesc: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
    lineHeight: 18,
  },

  openBtn: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#7f1d1d",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  /* CENTER AREA */
  main: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  background: {
  flex: 1,
  width: "100%",
  height: "100%",
},

  /* RIGHT PANEL */
  rightPanel: {
    width: 280,
    padding: 18,
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderLeftColor: "#e5e5e5",
  },

  /* TITLES */
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  /* INPUT */
  input: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 14,
  },

  /* BUTTON */
  addBtn: {
    backgroundColor: "#7f1d1d",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  /* SUBJECT CARD */
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  subject: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111827",
    marginBottom: 10,
  },

  /* PROGRESS */
  progressBg: {
    height: 10,
    backgroundColor: "#ececec",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 6,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#d97777",
    borderRadius: 20,
  },

  /* TOPIC ROW */
  topicRow: {
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  topicText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },

  /* RESPONSIVE */
  mobileContainer: {
    flexDirection: "column",
  },
});