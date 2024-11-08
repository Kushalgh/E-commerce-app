"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getCategory } from "../common/services/product.service";
import { CategoryItem } from "../common/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const getCategories = async () => {
    const { data: categories } = await getCategory();
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (category: CategoryItem) => {
    router.push(`${pathname}?productId=${category.id}`);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 shadow-sm">
      <div className="font-extrabold">
        <Link href={"/"}>VoltZone</Link>
      </div>

      <div className="flex gap-5">
        {categories.map((el) => {
          return (
            <div key={el.category_name} onClick={() => handleCategoryClick(el)}>
              <Link href={el.category_name}>{el.category_name}</Link>
            </div>
          );
        })}
      </div>

      <div>
        <Link href={"/cart"}>
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
