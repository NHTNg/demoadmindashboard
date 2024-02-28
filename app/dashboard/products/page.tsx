import Search from "../../ui/DashBoard/SearchComponent/Search";
import Pagination from "../../ui/DashBoard/Pagination/Pagination";
import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/DashBoard/Products/product.module.css";
import { fetchProducts } from "../../lib/data";
import { deleteProduct } from "../../lib/actions";

type TypeSearchParam = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

const Products = async ({ searchParams }: TypeSearchParam) => {
  const query = searchParams.q || "";
  const page = Number(searchParams?.page) || 1;
  const { products, count } = await fetchProducts(query, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.button}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id.toString()}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img ? product.img : "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.price}</td>
              <td>
                {product.createdAt
                  ? product.createdAt.toString().slice(4, 16)
                  : ""}
              </td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
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

export default Products;
