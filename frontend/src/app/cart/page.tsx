"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Cart from "../components/Cart";
import { RootState } from "../common/utils/store/store";
import { CartItem } from "../common/utils/store/reducers/cart-types";
import { makePayment } from "../common/services/stripe.payment";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10; // You might want to calculate this based on your business logic
  const total = subtotal + shipping;

  const handleCheckout = () => {
    makePayment(
      cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }))
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          <CardTitle>Your Cart</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
          cart
        </p>
      </CardHeader>
      {cartItems.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-4 text-left">Product</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <Cart
                    key={item.id}
                    id={+item.id}
                    image={item.image}
                    productName={item.name}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 space-y-4 p-4">
            <Separator />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p>Your cart is empty.</p>
        </div>
      )}
      <CardFooter className="flex justify-between flex-wrap gap-4">
        <Link href="/" passHref>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
        <Button onClick={handleCheckout} disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
