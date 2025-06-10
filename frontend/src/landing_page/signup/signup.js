import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setUserExists(false);

    try {
      const res = await axios.post(
        "https://zerodha-clone-j9pk.onrender.com/api/auth/signup",
        { email, password, username },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/login");
      } else {
        if (res.data.message === "User already exists") {
          setUserExists(true);
        } else {
          setError(res.data.message || "Signup failed");
        }
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError("Server error during signup.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Signup</h2>

      {userExists ? (
        <div style={styles.existsContainer}>
          <p style={styles.existsMessage}>
            This email is already registered. Please{" "}
            <button
              style={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSignup} style={styles.form}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button style={styles.button} type="submit">
              Sign Up
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>

          <div style={styles.loginPrompt}>
            Already have an account?{" "}
            <button
              style={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "3rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
    textAlign: "center",
  },
  existsContainer: {
    textAlign: "center",
  },
  existsMessage: {
    fontSize: "1rem",
    color: "#555",
  },
  loginPrompt: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "1rem",
    color: "#555",
  },
  loginButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    padding: 0,
    fontSize: "1rem",
  },
};

export default Signup;
