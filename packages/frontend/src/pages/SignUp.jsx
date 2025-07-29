import SignUpForm from "../features/auth/SignUpForm";
import styles from "../assets/styles/SignUp.module.css";
const SignUp = () => {
  return (
        <div className={`container ${styles.flexColumns}`}>
            <div className={`${styles.row}`}>
                <div className={`${styles.column}`}>
                    <div className={`bento ${styles.infoColumn}`}>
                        <h1>Who are <span>we</span>?</h1>
                        <p>Coin<span>purse</span> is a web application developed with finance management in mind. Our easy to use budgeting services allow users like you to visualize your finances with stastical graphics. By telling you how your savings change and how close you are to your financial goals, we enable you to take your earnings to the next level</p>
                    </div>
                </div>
                <div className={`${styles.column}`}>
                    <div className={`bento ${styles.graphicColumn}`}>
                        <h1>Coin<span>purse</span></h1>
                        <div>
                            <SignUpForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;
