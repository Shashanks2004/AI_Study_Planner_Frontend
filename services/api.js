import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-study-planner-backend-zi9t.onrender.com/api", // replace with your IP
});

export const toggleTopic = async (subjectId: string, topicId: string) => {
  try {
    const res = await fetch(
      `https://ai-study-planner-backend-zi9t.onrender.com/api/toggle-topic`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId, topicId }),
      }
    );

    return await res.json();
  } catch (err) {
    console.log("Toggle error:", err);
  }
};

export default API;