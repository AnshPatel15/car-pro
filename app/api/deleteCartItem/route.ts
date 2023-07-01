import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, carId } = body; // Assuming the ID of the cart item to delete is provided in the request body

  if (!id) {
    return NextResponse.error();
  }

  const deleteCartItem = await prisma.cartItem.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleteCartItem);
}
