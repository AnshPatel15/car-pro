import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CartCard } from "@/components/cartListing/CartCard";
import getCurrentUser from "../actions/getCurrentUser";
import { CartItem, User } from "@prisma/client";
import getCartItems from "../actions/getCartItem";

interface CartPageProps {
  currentUser: User | null;
  cartItems: any;
}

const CartPage = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id?.toString() ?? ""; // Ensure userId is always a string
  const cartItems: any = await getCartItems(userId);
  console.log(cartItems);
  return (
    <main className="box-border max-w-7xl mx-auto p-20">
      <div className=" w-full pt-7">
        <div>
          <CartCard currentUser={currentUser} cartItems={cartItems} />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
