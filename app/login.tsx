import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const isMobile = width < 768;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    if (Platform.OS === "web") {
      // 💻 Web dashboard
      router.replace("/web-dashboard");
    } else {
      // 📱 Mobile dashboard
      router.replace("/(tabs)/mob-dashboard");
    }

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
      {/* LEFT IMAGE WITH MATCHING OVERLAY */}
      <ImageBackground
        source={require("../assets/images/login-bg.png")}
        style={[
          styles.left,
          {
            flex: isMobile ? 1 : 1,
            width: isMobile ? "100%" : "100%",
            height: isMobile ? 250 : "100%",
          },
        ]}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

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

        <Text style={styles.subtitle}>
          Login with your account
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Your email address"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* SIGNUP NAV */}
        <Text
          style={styles.link}
          onPress={() => router.push("/register")}
        >
          Don’t have an account? Sign up
        </Text>

        <Text style={styles.footer}>
          By continuing, you're signing up to our service
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f4", // warm neutral bg
  },

  left: {
    position: "relative",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // 🔥 UPDATED OVERLAY (MATCHES RIGHT SIDE)
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(120, 53, 15, 0.25)", // warm maroon/brown tint
  },

  right: {
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    color: "#7f1d1d",
    marginBottom: 20,
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },

  highlight: {
    color: "#7f1d1d",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },

  // 🔥 UPDATED BUTTON
  button: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#7f1d1d",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  link: {
    marginTop: 15,
    color: "#7f1d1d",
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