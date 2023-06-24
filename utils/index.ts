import { CarProps, FilterProps } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel, limit } = filters;

  const headers = {
    "X-RapidAPI-Key": "e69e41ad2dmshd4e741ae52db7d4p153112jsnadca73ffd185",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();

  const carsWithIDs = result.map((car: any) => ({
    carId: uuidv4(), // Generate a unique ID for each car object
    ...car, // Spread the existing car properties
  }));

  return carsWithIDs;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 500; // Base rental charges in ruppees

  const mileageFactor = 10; // Rate per mile driven

  const ageFactor = 5; // rate per year of vehicle age

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");

  url.searchParams.append("make", make);
  url.searchParams.append(
    "modelFamily",
    typeof model === "string" ? model.split(" ")[0] : ""
  );
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
