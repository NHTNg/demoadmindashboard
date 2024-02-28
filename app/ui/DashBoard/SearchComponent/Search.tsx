"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type TypePlaceholder = {
  placeholder: string;
};
const Search = ({ placeholder }: TypePlaceholder) => {
  const searchParam = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("page", "1");
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParam.get("q")?.toString()}
      />
    </div>
  );
};
export default Search;
