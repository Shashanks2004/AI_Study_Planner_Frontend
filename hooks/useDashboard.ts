import { useEffect, useState } from "react";
import { getSyllabus } from "../services/api";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useDashboard = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSyllabus = async (userId: string) => {
    if (!userId) return; // 🔥 IMPORTANT

    try {
      console.log("Sending userId:", userId);

      const data = await getSyllabus(userId);
      console.log("Fetched syllabus:", data);

      setSyllabusList(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("USER ID (MOBILE):", user.uid);
        fetchSyllabus(user.uid);
      } else {
        console.log("No user logged in");
        setSyllabusList([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    syllabusList,
    loading,
    fetchSyllabus,
  };
};