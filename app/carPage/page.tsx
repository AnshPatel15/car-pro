"use client";
import useCars from "@/hooks/useCars";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";

function CarPage() {
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const carRent = calculateCarRent(car.city_mpg, car.year);

  return (
    <div className="flex items-center justify-center ">
      <div className=" mx-32 my-44">
        <h1 className=" text-2xl font-bold capitalize">
          {car.make} {car.model}
        </h1>
        <p className=" text-2xl">Price = {carRent}</p>
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default CarPage;
