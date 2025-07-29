import Navbar from "../components/Navbar";
import styles from "../assets/styles/Home.module.css"

const Home = () => {
  return (
    <div className={`container`}>
      <Navbar></Navbar>
      <div className={`charts`}>
        <div className={`bento ${styles.pie}`}></div>
        <div className={`bento ${styles.svt}`}></div>
      </div>
      <div className={`goals`}>
        <div className={`bento ${styles.addBudget}`}></div>
        <div className={`bento ${styles.progress}`}></div>
        <div className={`bento ${styles.bills}`}></div>
      </div>
    </div>
  );
};

export default Home;
