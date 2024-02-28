"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "./pagination.module.css";

type TypeProps = {
  count: number;
};
type TypePage = number;

export default function Pagination({ count }: TypeProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const ITEM_PER_PAGE = 5;
  const params = new URLSearchParams(searchParams);
  const page: TypePage = Number(searchParams.get("page")) || 1;


  const hasPrev = ITEM_PER_PAGE * (Number(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (Number(page) - 1) + ITEM_PER_PAGE < count;

  const handleChange = (value: string) => {
    value === "prev"
      ? params.set("page", `${page - 1}`)
      : params.set("page", `${page + 1}`);
    return replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button}`}
        disabled={!hasPrev}
        onClick={(e) => handleChange("prev")}
      >
        Prev
      </button>
      <button
        className={`${styles.button}`}
        disabled={!hasNext}
        onClick={(e) => handleChange("next")}
      >
        Next
      </button>
    </div>
  );
}
