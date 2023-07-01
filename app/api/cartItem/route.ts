import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { carId, userId, startDate, endDate, totalPrice, make, year, model } =
    body;

  if (
    !carId ||
    !userId ||
    !startDate ||
    !endDate ||
    !totalPrice ||
    !make ||
    !model ||
    !year
  ) {
    return NextResponse.error();
  }
  console.log(NextResponse.error());

  const cartItem = await prisma.cartItem.create({
    data: {
      userId: currentUser.id,
      startDate,
      endDate,
      totalPrice,
      carId: carId,
      make,
      model,
      year,
    },
  });

  return NextResponse.json(cartItem);
}
