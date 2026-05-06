import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

// ✅ ADD THIS IMPORT
import API from "../services/api";

export default function StudyPlan() {
  const [activeView, setActiveView] = useState("web-dashboard");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [plan, setPlan] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [tasksByDate, setTasksByDate] = useState<Record<number, any[]>>({});

  const addTask = (day: number) => {
    const text = prompt("Enter task");
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      done: false,
    };

    setTasksByDate((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newTask],
    }));
  };

  const toggleTask = (day: number, id: number) => {
    setTasksByDate((prev) => ({
      ...prev,
      [day]: prev[day].map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  };

  const goToNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(next);
  };

  const goToPrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prev);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ AI PLAN FUNCTION
  const generatePlan = async () => {
    try {
      const res = await API.post("/ai/plan", {
        subjects: ["DBMS", "OS", "CN"],
        daysLeft: 10,
      });

      setPlan(res.data.plan);
    } catch (err) {
      console.log("AI error:", err);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.2 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPrevMonth}>
            <Text style={styles.navBtn}>⬅</Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            📅 {currentDate.toLocaleString("default", { month: "long" })} {year}
          </Text>

          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.navBtn}>➡</Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 GENERATE PLAN BUTTON */}
        <TouchableOpacity
          onPress={generatePlan}
          style={styles.generateBtn}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Generate Study Plan
          </Text>
        </TouchableOpacity>

        {/* WEEKDAYS */}
        <View style={styles.weekRow}>
          {weekdays.map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* CALENDAR GRID */}
        <View style={styles.grid}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={"empty" + i} style={styles.emptyBox} />
          ))}

          {daysArray.map((d) => {
            const tasks = tasksByDate[d] || [];
            const allDone =
              tasks.length > 0 && tasks.every((t) => t.done);

            return (
              <View
                key={d}
                style={[
                  styles.dayBox,
                  allDone && styles.completedDay,
                ]}
              >
                <Text style={styles.date}>{d}</Text>

                {tasks.map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    onPress={() => toggleTask(d, task.id)}
                  >
                    <Text
                      style={
                        task.done
                          ? styles.doneTask
                          : styles.pendingTask
                      }
                    >
                      {task.done ? "✔ " : "⬜ "} {task.text}
                    </Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={() => addTask(d)}>
                  <Text style={styles.addBtn}>＋</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* ✅ AI PLAN OUTPUT */}
        {plan && (
          <ScrollView style={styles.planBox}>
            <Text>{plan}</Text>
          </ScrollView>
        )}

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  navBtn: { fontSize: 18, paddingHorizontal: 10 },

  title: { fontSize: 22, fontWeight: "bold" },

  // ✅ NEW BUTTON STYLE
  generateBtn: {
    backgroundColor: "#f3a6a8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  weekDay: {
    width: "13.5%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#555",
  },

  grid: { flexDirection: "row", flexWrap: "wrap" },

  emptyBox: { width: "13.5%", height: 80 },

  dayBox: {
    width: "13.5%",
    minHeight: 90,
    marginVertical: 6,
    padding: 5,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
  },

  completedDay: {
    backgroundColor: "rgba(144,238,144,0.8)",
  },

  date: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },

  pendingTask: { fontSize: 9, color: "#333" },

  doneTask: {
    fontSize: 9,
    color: "green",
    textDecorationLine: "line-through",
  },

  addBtn: {
    fontSize: 16,
    textAlign: "center",
    color: "#ff6b6b",
    marginTop: 4,
  },

  // ✅ PLAN BOX STYLE
  planBox: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    maxHeight: 200,
  },
});