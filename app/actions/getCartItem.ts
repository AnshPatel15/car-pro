import prisma from "@/app/libs/prismadb";
import { CartItem } from "@prisma/client";

export default async function getCartItems(
  userId: string
): Promise<CartItem[]> {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return cartItems; // Return the cartItems associated with the user
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    throw error; // Rethrow the error to propagate it
  }
}
