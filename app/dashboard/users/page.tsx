import { fetchUser } from "../../lib/data";
import Pagination from "../../ui/DashBoard/Pagination/Pagination";
import Search from "../../ui/DashBoard/SearchComponent/Search";
import styles from "../../ui/DashBoard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";

type TypeSearchParam = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

const UsersPage = async ({ searchParams }: TypeSearchParam) => {
  const q = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const { users, count } = await fetchUser(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.button}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img ? user.img : "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>13.10.2023</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "Active" : "Deactive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
