import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image, // ✅ FIXED IMPORT
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function RegisterScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const isMobile = width < 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created 🎉");
      router.replace("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isMobile ? "column" : "row" },
      ]}
    >
      {/* LEFT IMAGE */}
      <View
        style={[
          styles.left,
          {
            flex: isMobile ? 0 : 1,
            width: isMobile ? "100%" : undefined,
            height: isMobile ? 250 : "100%",
          },
        ]}
      >
        <Image
          source={require("../assets/images/login-bg.png")}
          style={styles.image}
        />
        <View style={styles.overlay} />
      </View>

      {/* RIGHT FORM */}
      <View
        style={[
          styles.right,
          {
            flex: 1,
            width: isMobile ? "100%" : undefined,
            padding: isMobile ? 20 : 40,
          },
        ]}
      >
        <Text style={[styles.logo, { fontSize: isMobile ? 30 : 40 }]}>
          ✓
        </Text>

        <Text style={[styles.title, { fontSize: isMobile ? 22 : 28 }]}>
          Welcome to{"\n"}
          <Text style={styles.highlight}>Structured</Text>
        </Text>

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          placeholder="Email"
          value={email} // ✅ FIXED
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          value={password} // ✅ FIXED
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text onPress={() => router.push("/")} style={styles.link}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  left: { position: "relative" },

  image: { width: "100%", height: "100%", resizeMode: "cover" },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,182,193,0.25)",
  },

  right: { justifyContent: "center", alignItems: "center" },

  logo: { color: "#f3a6a8", marginBottom: 20 },

  title: { textAlign: "center", marginBottom: 10 },

  highlight: { color: "#f3a6a8", fontWeight: "bold" },

  subtitle: { color: "#777", marginBottom: 20, textAlign: "center" },

  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#f3a6a8",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontWeight: "bold" },

  link: {
    marginTop: 15,
    color: "#f3a6a8",
    fontWeight: "bold",
  },

  footer: {
    marginTop: 15,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    maxWidth: 400,
  },
});