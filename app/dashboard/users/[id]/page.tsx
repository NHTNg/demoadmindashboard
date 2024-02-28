import { updateUser } from "../../../lib/actions";
import { findOne } from "../../../lib/data";
import { User } from "../../../lib/model";
import FileInput from "../../../ui/DashBoard/FileInput/FileInput";
import styles from "../../../ui/DashBoard/users/singleuser/singleuser.module.css"

import Image from "next/image";

interface IUser {
  username: string;
  password: string;
  img: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
  address: string;
}

const SingleUserPage = async ({ params }: { params: { id: string } }) => {
  const fetchUser = async (): Promise<IUser> => {
    "use server";
    const user = await findOne(params.id, User);
    return user;
  };

  const user = await fetchUser();
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img} alt="" fill />
        </div>
        <div>{user.username}</div>
        <FileInput />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} action={updateUser}>
          <input type="hidden" value={params.id} name="id" />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="text" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea rows={3} name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            defaultValue={user.isAdmin ? "isAdmin" : "isNot"}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Active</label>
          <select
            name="isAactive"
            id="isActive"
            defaultValue={user.isActive ? "isActive" : "isInActive"}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
