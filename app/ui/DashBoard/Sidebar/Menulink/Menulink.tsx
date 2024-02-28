"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";

type TypeItem = {
  icon: JSX.Element;
  title: string;
  path: string;
};

const MenuLink = ({ item }: { item: TypeItem }) => {
  const pathname = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  );
};
export default MenuLink;
