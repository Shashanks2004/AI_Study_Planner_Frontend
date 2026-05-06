import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TaskSummary({ tasks }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Your Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks added yet</Text>
      ) : (
        tasks.map((task: any, index: number) => (
          <View key={index} style={styles.card}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskTime}>⏰ {task.time}:00</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  empty: {
    color: "#888",
  },

  card: {
    backgroundColor: "#f2f4f8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  taskTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 3,
  },
});