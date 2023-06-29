"use client";

import { DesiredCarsContext } from "@/context/DesiredCarsContext";
import useCars from "@/hooks/useCars";
import useLoginModal from "@/hooks/useLoginModal";

import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { Reservation, User } from "@prisma/client";
import axios from "axios";
import { eachDayOfInterval } from "date-fns";
import { differenceInCalendarDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import CarReservation from "./CarReservation";

interface ImageDivProps {
  reservations?: Reservation[];
  currentUser?: User | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ImageDiv = ({ currentUser, reservations }: ImageDivProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const carRent: any = calculateCarRent(car.city_mpg, car.year);
  const originalCarId = car?.carId; // Store the original carId value
  const formattedCarId = originalCarId ? originalCarId.replace(/-/g, "") : "";
  const carModel: string = car.model;
  const carMake: string = car.make;

  const restoredCarId = formattedCarId
    ? formattedCarId.replace(
        /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
        "$1-$2-$3-$4-$5"
      )
    : "";

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      if (reservation.carId === formattedCarId) {
        // Filter reservations based on carId
        const range = eachDayOfInterval({
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate),
        });

        dates = [...dates, ...range];
      }
    });

    return dates;
  }, [reservations, formattedCarId]);

  console.log(restoredCarId); // Output the restored carId value

  console.log(car.carId, formattedCarId);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(carRent);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { desiredCars, setDesiredCars } = useContext(DesiredCarsContext);

  const [images, setImages] = useState({
    img1: generateCarImageUrl(car),
    img2: generateCarImageUrl(car, "29"),
    img3: generateCarImageUrl(car, "33"),
    img4: generateCarImageUrl(car, "13"),
  });

  const [activeImage, setActiveImage] = useState(images.img1);

  const reserveButton = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // add car to cart
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice: parseInt(totalPrice),
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        carId: formattedCarId,
      })
      .then(() => {
        toast.success("Car Reserved");
        setDateRange(initialDateRange);
        // redirect to my reservations
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error); // Log the error
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, loginModal, totalPrice, dateRange, router]);

  const addToCartButton = () => {
    // Create a new car object with the selected details
    const newCar = {
      model: carModel,
      make: carMake,
      year: car.year,
      totalPrice: parseInt(totalPrice),
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      carId: formattedCarId,
    };

    // Update the desiredCars array by adding the new car
    setDesiredCars((prevDesiredCars: any) => [...prevDesiredCars, newCar]);
    // Reset the selected date range
    setDateRange(initialDateRange);

    // Show a success message
    toast.success("Car added to cart");
    router.push("/cartPage");
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && carRent) {
        setTotalPrice(dayCount * carRent);
      } else {
        setTotalPrice(carRent);
      }
    }
  }, [dateRange, carRent]);

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-4 md:items-center lg:items-start">
      <div className=" w-full h-full flex flex-col gap-6  md:w-2/3 lg:w-2/4">
        <Image
          src={activeImage}
          alt=""
          width={600}
          height={300}
          className=" mt-28 aspect-square object-contain rounded-xl bg-gray-100 self-center"
        />

        <div className=" flex flex-row justify-between ">
          <Image
            src={images.img1}
            alt=""
            width={100}
            height={100}
            className="h-24 rounded-md  cursor-pointer bg-gray-100 hover:border-blue-500 hover:border-2 w-[23%]"
            onClick={() => setActiveImage(images.img1)}
          />
          <Image
            src={images.img2}
            alt=""
            width={100}
            height={100}
            className="h-24 rounded-md  cursor-pointer bg-gray-100 hover:border-blue-500 hover:border-2 w-[23%]"
            onClick={() => setActiveImage(images.img2)}
          />
          <Image
            src={images.img3}
            alt=""
            width={200}
            height={100}
            className="h-24 rounded-md  cursor-pointer bg-gray-100 hover:border-blue-500 hover:border-2 w-[23%]"
            onClick={() => setActiveImage(images.img3)}
          />
          <Image
            src={images.img4}
            alt=""
            width={100}
            height={100}
            className="h-24 rounded-md   cursor-pointer bg-gray-100 hover:border-blue-500 hover:border-2 w-[23%]"
            onClick={() => setActiveImage(images.img4)}
          />
        </div>
      </div>
      {/* About */}
      <div className="flex flex-col gap-4 lg:w-2/4 lg:mt-28 lg:p-5">
        <div>
          <h1 className=" text-3xl font-bold  capitalize p-4">
            {carMake} {carModel}
          </h1>
          <p className=" text-gray-600 p-3 text-left">
            Introducing our exceptional collection of vehicles, each offering a
            unique blend of performance, comfort, and style. Whether you're
            looking for elegance and sophistication with the{" "}
            <span className=" capitalize">
              {car.make} {car.model}
            </span>
            , power and practicality with the{" "}
            <span className=" capitalize">
              {car.make} {car.model}
            </span>
            , efficient city driving with the{" "}
            <span className=" capitalize">
              {car.make} {car.model}
            </span>
            , or off-road adventure with the{" "}
            <span className=" capitalize">
              {car.make} {car.model}
            </span>
            , our cars are meticulously crafted to provide an unparalleled
            driving experience. Step inside the luxurious cabins, experience the
            dynamic handling, and enjoy the advanced technologies that elevate
            your driving pleasure. Rent a{" "}
            <span className=" capitalize">
              {car.make} {car.model}
            </span>{" "}
            today and embark on a memorable journey tailored to your desires,
            with the confidence of our commitment to quality and customer
            satisfaction.
          </p>
        </div>
        <div className=" order-last mb-10 md:order-last md:col-span-3">
          <CarReservation
            price={carRent}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={addToCartButton}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageDiv;
