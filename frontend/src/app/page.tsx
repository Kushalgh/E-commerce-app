"use client";
import { useEffect, useState } from "react";
import { getProducts } from "./common/services/product.service";
import ProductCard from "./components/ProductCard";
import { ProductList } from "./common/types";

export default function Home() {
  const [data, setData] = useState<ProductList[]>([]);

  const getData = async () => {
    const { data: data1 } = await getProducts();
    setData(data1);
  };

  useEffect(() => {
    getData();
  }, []);

  const checkStock = (quantity: number, stock: number) => quantity > stock;

  return (
    <div>
      <div className="pt-8 grid gap-5 px-4 grid-cols-3 pb-4">
        {data.map((el) => {
          // const isOutOfStock = checkStock(1, el.stock); // Assuming quantity = 1 for check
          // console.log(isOutOfStock);
          return (
            <ProductCard
              key={el.id}
              id={el.id}
              imageUrl={el.image?.filepath || ""}
              symbol="$"
              name={el.name}
              description={el.description}
              price={el.price}
            />
          );
        })}
      </div>
    </div>
  );
}
