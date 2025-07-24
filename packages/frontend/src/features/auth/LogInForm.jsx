// frontend/features/auth/LogInForm.jsx
import { useState } from "react";
import styles from "../../assets/styles/LogInForm.module.css";
import { useNavigate, Link } from "react-router";
const url = import.meta.env.API_URL || "http://localhost:5000";
const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const LogInForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError(null);

    if (user.username.length < MIN_USERNAME_LENGTH) {
      setError(`Username must be at least ${MIN_USERNAME_LENGTH} characters.`);
      return;
    }
    if (user.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    setLoading(true);
    try {
      await login(user);
      setUser({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message);
    }

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
  };

  return (
    <div className={styles.authform}>
      <h2>Log In</h2>
      <form onSubmit={submitForm}>
        <div className={styles.formgroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <p className={styles.error} aria-live="polite">
            {error}
          </p>
        )}
        <div className={styles.formgroup}>
          <button
            className={`btn ${styles.btn}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </form>
      <hr />
      <p className="signUpText">
        Don&apos;t have an account?{" "}
        <Link className="link" to="/signup">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LogInForm;
