import { CarProps } from "@/types";

interface CarPageProps {
  car: CarProps;
}

async function CarPage({ car }: CarPageProps) {
  const { make, model } = await car;
  return (
    <div>
      <h1>hELLO</h1>
    </div>
  );
}

export default CarPage;
