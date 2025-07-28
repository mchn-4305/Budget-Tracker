import { useNavigate, Link } from "react-router";
import styles from "../assets/styles/Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className={`bento ${styles.nav}`}>
      <div>
        <h1>
          <Link className={`link ${styles.logo}`} to="/">
            Coin<span>purse</span>
          </Link>
        </h1>
      </div>
      <div className={`${styles.links}`}>
        <Link className={`link ${styles.navlink}`} to="/budgets">
          My Budgets
        </Link>
        <Link className={`link ${styles.navlink}`} to="/about">
          About
        </Link>
        <Link
          onClick={handleLogout}
          className={`link ${styles.navlink}`}
          to="/login"
        >
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
