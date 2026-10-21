import { useState } from "react";

const API = "http://127.0.0.1:5000";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateHash(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/hash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate hash.");
      }

      setResult(data);
    } catch {
      setError(
        "Could not connect to the backend. Start Flask in the backend folder and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyHash() {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.hash);
      } catch {
        setError(
          "Clipboard access failed. You can select and copy the hash manually."
        );
      }
    }
  }

  return (
    <main className="page">
      <header>
        <div className="badge">
          CRYPTOGRAPHY & NETWORK SECURITY
        </div>

        <h1>
          Simple <span>XOR Hash</span>
        </h1>

        <p className="subtitle">
          A small, interactive demonstration of a 32-bit hash function.
        </p>
      </header>

      <section className="card">
        <h2>Generate a hash</h2>

        <p className="muted">
          Enter any message and process it with repeated XOR operations.
        </p>

        <form onSubmit={generateHash}>
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows="4"
          />

          <button disabled={loading} type="submit">
            {loading ? "Generating..." : "Generate hash"}
          </button>
        </form>

        {result && (
          <div className="result">
            <div className="result-top">
              <span>HASH VALUE (HEX)</span>

              <button
                className="secondary"
                type="button"
                onClick={copyHash}
              >
                Copy hash
              </button>
            </div>

            <div className="hash">{result.hash}</div>

            <div className="stats">
              <span>
                Message bytes: <b>{result.message_length}</b>
              </span>

              <span>
                Blocks: <b>{result.block_count}</b>
              </span>
            </div>
          </div>
        )}
      </section>

      {error && <div className="error">{error}</div>}

      <aside className="notice">
        <b>Educational use only:</b> This XOR-based hash is not
        cryptographically secure and should not be used to protect real data.
      </aside>

      <footer>
        Built with React + Flask · XOR over 4-byte blocks
      </footer>
    </main>
  );
}