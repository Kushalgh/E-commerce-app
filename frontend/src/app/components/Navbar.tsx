"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const navList = [
    { category: "Mobiles", link: "/electronics/mobiles" },
    { category: "Laptops", link: "/electronics/laptops" },
    { category: "Televisions", link: "/electronics/televisions" },
    { category: "Audio Devices", link: "/electronics/audio-devices" },
    { category: "Cameras", link: "/electronics/cameras" },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200 shadow-sm">
      <div className="font-ex">
        <Link href={"/"}>VoltZone</Link>
      </div>
      <div className="flex gap-5">
        {navList.map((el) => (
          <div key={el.category}>{el.category}</div>
        ))}
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
