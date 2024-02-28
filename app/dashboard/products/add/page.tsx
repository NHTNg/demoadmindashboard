import styles from "@/app/ui/DashBoard/Products/AddProducts/addproduct.module.css";
import { connectToDB } from "@/app/lib/utils";
import { Products } from "@/app/lib/model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const AddProductPage = () => {
  const createNewProduct = async (formData: FormData) => {
    "use server";
    const { title, category, price, color, size, desc, stock } =
      Object.fromEntries(formData);
    try {
      connectToDB();
      const newProduct = new Products({
        title,
        category,
        price,
        color,
        size,
        stock,
        desc,
      });
      await newProduct.save();
    } catch (err) {
      console.log(err);
      throw new Error("Can't create new product, something went wrong!");
    }
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action={createNewProduct}>
        <input type="text" placeholder="title" name="title" required />
        <select name="category" id="category">
          <option value="true">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <input type="number" placeholder="stock" name="stock" />
        <textarea
          name="desc"
          id="desc"
          rows={16}
          placeholder="description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
