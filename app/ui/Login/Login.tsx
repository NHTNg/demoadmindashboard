import { authentication } from "../../lib/actions";
import styles from "./loginpage.module.css";

const LoginComponent = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} action={authentication}>
        <h1>Login</h1>
        <input name="username" placeholder="username" />
        <input name="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
