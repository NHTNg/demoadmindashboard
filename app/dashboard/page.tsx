import Cards from "../ui/DashBoard/Card/Cards";
import styles from "../ui/DashBoard/dashboard.module.css";
import Chart from "../ui/DashBoard/Chart/Chart";
import Transactions from "../ui/DashBoard/Transactions/Transactions";
import Rightbar from "../ui/DashBoard/Rightbar/Rightbar";
const DashBoard = () => {
  return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            <Cards />
            <Cards />
            <Cards />
          </div>
          <Transactions />
          <Chart />
        </div>
        <div className={styles.rightbar}>
          <Rightbar />
        </div>
      </div>
      
  );
};
export default DashBoard;
