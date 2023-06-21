"use client";
import CarImages from "@/components/carListing/CarImages";
import ImageDiv from "@/components/carListing/ImageDiv";

import useCars from "@/hooks/useCars";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

function CarPage() {
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const carRent = calculateCarRent(car.city_mpg, car.year);
  const imgSrc = generateCarImageUrl(car);

  return (
    <main className="box-border max-w-7xl mx-auto p-8">
      {/* <div className="pt-40 pl-8 md:pl-32">
        <div className="flex flex-col md:flex-row relative">
          <div className="w-full flex justify-between">
            <CarImages />
          </div>
          <div className="flex flex-col md:ml-8">
            {car.make && car.model && (
              <div>
                <div className="whitespace-nowrap text-4xl font-bold capitalize">
                  {car.make} {car.model}
                </div>
                <div>Price: {carRent}</div>
              </div>
            )}
            <div className="text-xl mt-14 flex flex-wrap gap-1 border-2 rounded-lg w-full md:w-1/2 py-3 xl:ml-[450px]">
              {Object.entries(car).map(([key, value]) => (
                <div
                  className="flex justify-between gap-2 text-right w-full border-b-2 rounded-lg mx-4 my-1"
                  key={key}
                >
                  <h4 className="text-gray capitalize">
                    {key.split("_").join(" ")}
                  </h4>
                  <p className="text-black-100 font-semibold">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="my-5" />
      </div> */}
      <ImageDiv />
    </main>
  );
}

export default CarPage;
