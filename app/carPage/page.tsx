"use client";
import CarImages from "@/components/carListing/CarImages";

import ClientOnly from "@/components/ClientOnly";
import useCars from "@/hooks/useCars";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";

function CarPage() {
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const carRent = calculateCarRent(car.city_mpg, car.year);
  const imgSrc = generateCarImageUrl(car);

  return (
    <main className="box-border">
      <div className="pt-40 pl-32">
        <div className="flex flex-row relative">
          <div className="w-2/5 flex justify-between">
            <CarImages />
          </div>
          <div className="pl-20 flex justify-center whitespace-nowrap text-4xl font-bold capitalize">
            {car.make} {car.model}
          </div>
          <div className="mt-28 flex flex-col">
            <div className="text-2xl flex flex-col">
              HELLO<div>Cunt</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CarPage;
