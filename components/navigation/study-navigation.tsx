"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";
import styles from "./study-navigation.module.css";

export function StudyNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation} aria-label="학습 메뉴">
      {navigationItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={styles.link}
          aria-current={pathname === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
