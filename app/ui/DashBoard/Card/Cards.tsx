import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./cards.module.css";

const Cards = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.text}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>9999</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> more then previous week
        </span>
      </div>
    </div>
  );
};

export default Cards;
