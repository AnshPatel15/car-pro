"use client";
import useCars from "@/hooks/useCars";
import React, { useContext } from "react";
import { generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { DesiredCarsContext } from "@/context/DesiredCarsContext";
import ButtonTwo from "../ButtonTwo";
import EmptyState from "../EmptyState";
import { useRouter } from "next/navigation";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CartCard = () => {
  const router = useRouter();
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const { desiredCars, setDesiredCars } = useContext(DesiredCarsContext);

  const removeCartCar = (index: number) => () => {
    const updatedCars = [...desiredCars];
    updatedCars.splice(index, 1);
    setDesiredCars(updatedCars);
  };

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount: any) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      return (
        <EmptyState
          title="Something went wrong"
          buttonLabel="Go back"
          onRemoveFilters={() => router.push("/cartPage")}
        />
      );
    }

    const success = (
      <EmptyState
        title="SUCCESS"
        subtitle="Reservation is received"
        buttonLabel="Go to reservations"
        onRemoveFilters={() => router.push("/Orders")}
      />
    );

    const options = {
      key: process.env.RAZORPAY_ID || "rzp_test_MDTg8ExJtXoKZg",
      currency: "INR",
      amount: amount * 100,
      name: "Car Hub",
      description: "Thank you for using our services",
      image: "../../public/car-logo.svg",

      handler: function (response: any) {
        console.log("Payment success:", response);

        setDesiredCars([]);

        // if (response) {
        //   axios.post("/api/payments");
        // }

        return success;
      },
      prefill: {
        name: "Car Hub",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleCheckout = () => {
    // Calculate the total amount based on the desired cars
    const totalAmount = desiredCars.reduce(
      (total, cartCar) => total + cartCar.totalPrice,
      0
    );

    // Display Razorpay for payment
    displayRazorpay(totalAmount);
  };

  return (
    <div>
      {desiredCars.map((cartCar, index) => (
        <div
          key={index}
          className="flex flex-row border-2 rounded-lg p-2 my-4 items-center"
        >
          <div className="h-full flex flex-row border-r-2">
            <Image
              src={generateCarImageUrl(cartCar)}
              width={150}
              height={150}
              alt="cart car image"
              className="object-contain aspect-square"
            />
          </div>
          <div className="flex flex-col pl-5 w-[80%]">
            <div className="flex font-semibold capitalize">
              {cartCar.make} {cartCar.model}
            </div>
            {cartCar.startDate && (
              <div>
                From:{" "}
                {cartCar.startDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
            {cartCar.endDate && (
              <div>
                To:{" "}
                {cartCar.endDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
            <div className="flex">Total: {cartCar.totalPrice}</div>
            <div className="flex flex-row justify-between">
              <button
                onClick={removeCartCar(index)}
                className="flex flex-row justify-between"
              >
                x
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <ButtonTwo label="Checkout" onClick={handleCheckout} />
      </div>
    </div>
  );
};
