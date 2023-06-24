// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   carId?: string;
//   userId?: string;
// }

// export default async function getReservations(params: IParams) {
//   const { carId, userId } = params;

//   const query: any = {};

//   if (carId) {
//     query.carId = carId;
//   }

//   if (userId) {
//     query.userId = userId;
//   }

//   const reservations = await prisma.reservation.findMany({
//     where: query,
//     include: {
//         user: userId,

//     },
//   });
// }

// TODO line break

// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   carId?: string;
//   userId?: string;
// }

// export default async function getReservations(params: IParams) {
//   try {
//     const { carId, userId } = params;

//     const query: any = {};

//     if (carId) {
//       query.carId = carId;
//     }

//     if (userId) {
//       query.userId = userId;
//     }

//     const reservation = await prisma.reservation.findFirst({
//       where: query,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!reservation) {
//       throw new Error("Reservation not found."); // Handle the case where the reservation doesn't exist
//     }

//     // Check if the reservation is already blocked or not
//     if (reservation.isBlocked) {
//       throw new Error("Reservation is already blocked."); // Handle the case where the reservation is already blocked
//     }

//     // Block the reservation
//     const blockedReservation = await prisma.reservation.update({
//       where: {
//         id: reservation.id,
//       },
//       data: {
//         isBlocked: true, // Set the flag or update the reservation status to indicate that it is blocked
//       },
//     });

//     return blockedReservation;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }

import prisma from "@/app/libs/prismadb";

interface IParams {
  carId?: string;
  userId?: string;
}

export async function getReservations(params: IParams) {
  try {
    const { carId, userId } = params;

    const query: any = {};

    if (carId) {
      query.carId = carId;
    }

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error);
    return []; // Return an empty array when an error occurs
  }
}
