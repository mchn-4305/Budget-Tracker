import { useState } from "react";
import styles from "../../assets/styles/SignUpForm.module.css";
import { useNavigate, Link } from "react-router";
const url = import.meta.env.API_URL || "http://localhost:5000";
const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const SignUpForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

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
    if (user.password != user.confirmPassword) {
      setError(`Passwords must match.`);
      return;
    }

    setLoading(true);
    try {
      await signup(user);
      setUser({
        username: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    const res = await fetch(`${url}/api/auth/register`, {
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
  };

  return (
    <div className={styles.authform}>
      <h2>Sign Up</h2>
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
        <div className={styles.formgroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={user.confirmPassword}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <hr />
      <p className="signUpText">
        Already have an account?{" "}
        <Link className="link" to="/login">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
