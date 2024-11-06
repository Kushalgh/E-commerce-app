import React from "react";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  removeItem,
} from "../common/utils/store/reducers/cart-reducer";

export interface CartItems {
  id: number;
  image: string;
  productName: string;
  price: number;
  quantity: number;
  // isOutOfStock: boolean;
}

const Cart = ({
  id,
  image,
  productName,
  price,
  quantity,
}: // isOutOfStock,
CartItems) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      addItem({
        id: id?.toString(),
        image,
        name: productName,
        price,
        quantity: 1,
        // isOutOfStock,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(removeItem(id.toString()));
  };

  const handleDelete = () => {
    dispatch(deleteItem(id.toString()));
  };

  const makePayment = async () => {};
  return (
    <tr className="border-b">
      <td className="py-4 px-4">
        <div className="flex justify-center">
          <img
            src={image}
            alt={productName}
            className="w-16 h-16 object-cover rounded"
          />
        </div>
      </td>
      <td className="py-4 px-4 font-medium">
        {" "}
        <div className="flex justify-center">{productName} </div>
      </td>
      <td className="py-4 px-4">
        {" "}
        <div className="flex justify-center">${price?.toFixed(2)}</div>
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-6 py-2 items-center justify-center">
          <div
            className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer p-1 rounded-md"
            onClick={handleDecrement}
          >
            <Minus size={15} />
          </div>
          {quantity}
          <div
            className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 hover:cursor-pointer"
            onClick={handleIncrement}
          >
            <Plus size={15} />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        {" "}
        <div className="flex justify-center">
          ${(price * quantity)?.toFixed(2)}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Cart;
