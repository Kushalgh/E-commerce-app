"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/utils/store/store";
import { addItem } from "../common/utils/store/reducers/cart-reducer";

interface ProductCardPropTypes {
  id: string;
  name: string;
  description: string;
  price: number;
  symbol: string;
  imageUrl: string;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  symbol,
  imageUrl,
}: ProductCardPropTypes) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("here", name);

  const handleIncrement = (id: string) => {
    const itemExists = cartItems.find((item) => item.id === id.toString());
    // if (itemExists) {
    dispatch(
      addItem({
        id: id?.toString(),
        image: imageUrl,
        name: name,
        price,
        quantity: 1,
      })
    );
    // }
  };

  console.log("increment");

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Card className="flex items-center space-x-4 p-4">
      <img
        src={imageUrl}
        alt="Product Image"
        className="object-cover w-20 h-20 rounded-lg"
      />
      <div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {symbol} {price}
          </p>
        </CardContent>
        <div className="flex gap-4 pl-6 items-center">
          <Button size={"sm"} onClick={() => handleIncrement(id)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
