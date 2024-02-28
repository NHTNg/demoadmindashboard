import styles from "../../ui/DashBoard/Products/singleproduct/singleproduct.module.css";
import Image from "next/image";
import { findOne } from "../../../lib/data";
import { Products } from "../../../lib/model";

interface IProduct {
  _id: string;
  img: string;
  title: string;
  price: string;
  stock: string;
  color: string;
  category: string;
  description: string;
  size: string;
}

export default async function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const fetchOneProduct = async (): Promise<IProduct> => {
    "use server";
    const product = await findOne(params.id, Products);
    return product;
  };
  const product = await fetchOneProduct();

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img ? product.img : "/astronaut.png"}
            alt={product._id}
            fill
          />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="text" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label>Size</label>
          <input name="address" placeholder={product.size} />
          <label>Category</label>
          <select
            name="isAdmin"
            id="isAdmin"
            defaultValue={
              product.category === "computer" ? "computers" : "kitchen"
            }
          >
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Active</label>
          <textarea
            rows={3}
            name="description"
            id="description"
            placeholder="description"
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}
