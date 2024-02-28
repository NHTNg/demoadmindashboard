import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} alt="BG-Image" fill src="/astronaut.png" />
        </div>
        <div className={styles.texts}>
          <span className={styles.noti}>🔥 Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus quisquam enim voluptas exercitationem, repellendus
            Recusandae natus quas eligendi sed eveniet?
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.texts}>
          <span className={styles.noti}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus quisquam enim voluptas exercitationem, repellendus
            Recusandae natus quas eligendi sed eveniet?
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
