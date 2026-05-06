import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Home({ navigation }: any) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to Study Planner 🚀</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}