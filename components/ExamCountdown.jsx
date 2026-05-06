import React, { useState } from "react";

function ExamCountdown() {
  const [examDate, setExamDate] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://ai-study-planner-backend-zi9t.onrender.com/api/exam-countdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examDate }),
      });

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error(error);
      setResult("Error calculating countdown");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📅 Exam Countdown</h2>

      <input
        type="date"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
      />

      <button onClick={handleSubmit}>Check</button>

      {result && <p>{result}</p>}
    </div>
  );
}

export default ExamCountdown;