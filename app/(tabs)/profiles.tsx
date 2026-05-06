import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 🔥 Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  // 🔥 Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login"); // redirect after logout
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>

      {user ? (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading user...</Text>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F6FA",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: "gray",
  },

  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  logoutBtn: {
    backgroundColor: "#8B1E1E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});