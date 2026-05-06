import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Props = {
  onClose: () => void;
};

export default function OnboardingModal({ onClose }: Props) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Structured Web",
      image: require("../assets/images/welcome.png"),
    },
    {
      title: "Your Privacy & Data",
      image: require("../assets/images/privacy.png"),
    },
    {
      title: "Let's start planning today",
      image: require("../assets/images/planning.png"),
    },
    {
      title: "When did you wake up?",
      image: require("../assets/images/morning.png"),
    },
    {
      title: "When will you go to bed?",
      image: require("../assets/images/night.png"),
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        
        {/* IMAGE */}
        <Image
          source={steps[step].image}
          style={styles.image}
          resizeMode="contain"
        />

        {/* TITLE */}
        <Text style={styles.title}>{steps[step].title}</Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>
            {step === steps.length - 1 ? "Finish Setup" : "Continue"}
          </Text>
        </TouchableOpacity>

        {/* SKIP */}
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  card: {
    width: 350,
    height: 550,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 300,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#f3a6a8",
    padding: 14,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  skip: {
    marginTop: 10,
    color: "#888",
  },
});