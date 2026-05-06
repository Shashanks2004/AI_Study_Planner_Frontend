import { auth } from "../config/firebase";

export const saveSyllabus = async (data: any) => {
  const userId = auth.currentUser?.uid;

  return fetch("https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      userId, // 🔥 ADD THIS
    }),
  });
};

export const getSyllabus = async (userId: string) => {
  try {
    const res = await fetch(
      `https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus?userId=${userId}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("API Error:", err);
    return [];
  }
};

export const toggleTopic = async (subjectId: string, topicId: string) => {
  try {
    console.log("TOGGLING:", subjectId, topicId);

    const res = await fetch(
      `https://ai-study-planner-backend-zi9t.onrender.com/api/syllabus/${subjectId}/${topicId}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();
    console.log("TOGGLE RESPONSE:", data);

    return data;
  } catch (err) {
    console.log("Toggle error:", err);
  }
};