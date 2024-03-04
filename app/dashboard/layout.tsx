import Navbar from "../ui/DashBoard/Navbar/Navbar";
import Sidebar from "../ui/DashBoard/Sidebar/Sidebar";
import style from "../ui/DashBoard/dashboard.module.css";
import Footer from "../ui/DashBoard/Footer/Footer";
const Applayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <div className={style.menu}>
          <Sidebar />
      </div>
      <div className={style.content}>
        <Navbar />
        {children}
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Applayout;
