import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function FloatingAddTask() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FLOAT BUTTON */}
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* SIDE PANEL */}
      {open && (
        <View style={styles.overlay}>
          <View style={styles.panel}>

            {/* CLOSE */}
            <TouchableOpacity
              style={styles.close}
              onPress={() => setOpen(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Structure Your Day</Text>
            </View>

            {/* BODY */}
            <View style={styles.body}>
              <TextInput
                placeholder="Task title"
                style={styles.input}
              />

              <TextInput
                placeholder="Today, 17 Apr 2026"
                style={styles.input}
              />

              <TextInput
                placeholder="12:55 PM - 01:10 PM"
                style={styles.input}
              />

              <TextInput
                placeholder="Add notes..."
                style={[styles.input, { height: 80 }]}
                multiline
              />
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.createBtn}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Create Task
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f3a6a8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  plus: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  panel: {
    width: 350,
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
  },

  close: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  header: {
    backgroundColor: "#f3a6a8",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  body: {},

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  createBtn: {
    backgroundColor: "#f3a6a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
});