import LogInForm from "../features/auth/LogInForm";
import styles from "../assets/styles/SignUp.module.css";

const LogIn = () => {
  return (
    <div className={`container`}>
      <h1 className={`${styles.header}`}>
        Coin<span>purse</span>
      </h1>
      <div className={`${styles.container}`}>
        <LogInForm />
      </div>
    </div>
  );
};

export default LogIn;
