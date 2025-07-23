import LogInForm from "./LogInForm";
import styles from "./LogIn.module.css";

const LogIn = () => {
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.header}`}>Coin<span>purse</span></h1>
            <LogInForm/>
        </div>
    )
}

export default LogIn;