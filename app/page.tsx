"use client";

import Image from "next/image";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/app/constants";

import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  const [limit, setLimit] = useState(10);

  const [selected, setSelected] = useState([0]);

  const handleRemoveFilters = () => {
    setManufacturer("");
    setModel("");
    setSelected([0]);
  };

  const getCars = async () => {
    try {
      setLoading(true);
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      // Update the fetched cars to include unique IDs
      const carsWithIDs = result.map((car: any) => ({
        id: car.id, // Use the existing ID from the fetched cars
        ...car, // Spread the car properties
      }));

      setAllCars(carsWithIDs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, limit, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className=" overflow-hidden">
      <Hero />

      <div className=" mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className=" text-4xl font-extrabold ">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className=" mt-16 w-full flex-center">
                <Image
                  src="/loading.gif"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              <EmptyState showReset onRemoveFilters={handleRemoveFilters} />
            </h2>
            <p>{allCars}</p>
          </div>
        )}
      </div>
    </main>
  );
}
