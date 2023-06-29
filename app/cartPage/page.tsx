import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartCard } from "@/components/cartListing/CartCard";

const CartPage = () => {
  return (
    <main className="box-border max-w-7xl mx-auto p-20">
      <div className=" w-full pt-7">
        <div>
          <CartCard />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
