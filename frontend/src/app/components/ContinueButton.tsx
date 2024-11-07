"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { resetCart } from "../common/utils/store/reducers/cart-reducer";
import Link from "next/link";

const ContinueButton = () => {
  const handleRedirect = () => {
    resetCart();
    console.log("called");
  };
  return (
    <Link href={"/"}>
      <Button
        onClick={handleRedirect}
        className="bg-green-600 hover:bg-green-700 text-white text-lg py-2 px-6"
      >
        Continue Shopping
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  );
};

export default ContinueButton;
