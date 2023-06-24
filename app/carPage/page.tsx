import ImageDiv from "@/components/carListing/ImageDiv";
import { User } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";

interface IParams {
  currentUser?: User | null;
  carId?: string;
  restoredCarId: any;
}

async function CarPage({ params }: { params: IParams }) {
  const { restoredCarId } = params;
  const reservations = await getReservations({ carId: restoredCarId });
  const currentUser = await getCurrentUser();
  return (
    <main className="box-border max-w-7xl mx-auto p-8">
      <ImageDiv reservations={reservations} currentUser={currentUser} />
    </main>
  );
}

export default CarPage;
