import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  const handleSummarize = async () => {
    setSummary("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3001/summaries",
        { original_text: originalText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummary(res.data.summary);

      setHistory(prev => [
        { original_text: originalText, summary_text: res.data.summary, created_at: new Date().toISOString() },
        ...prev
      ]);

    } catch (err) {
      setError("Failed to summarize. Check your login or server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get("http://localhost:3001/summaries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data.summaries);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
  
    fetchSummaries();
  }, []);



  return (
    <>
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h2>📄 Text Summarizer</h2>
      <textarea
        rows="8"
        placeholder="Paste your text here..."
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleSummarize}>Summarize</button>

      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>🧠 Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogout} style={{ float: "right", marginBottom: 20 }}>
        Logout
    </button>
    </div>

    {history?.length > 0 && (
        <div style={{ marginTop: 30 }}>
            <h3>🕘 Previous Summaries:</h3>
            {history.map((item, index) => (
            <div key={index} style={{ marginBottom: 15 }}>
                <small style={{ color: "gray" }}>{new Date(item.created_at).toLocaleString()}</small>
                <p><strong>Original:</strong> {item.original_text}</p>
                <p><strong>Summary:</strong> {item.summary_text}</p>
                <hr />
            </div>
            ))}
        </div>
    )}
    </>
  );
};

export default Dashboard;
