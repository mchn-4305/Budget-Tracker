import LogInForm from "../features/auth/LogInForm";
import styles from "../assets/styles/LogIn.module.css";

const LogIn = () => {
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.header}`}>Coin<span>purse</span></h1>
            <LogInForm/>
        </div>
    )
}

export default LogIn;