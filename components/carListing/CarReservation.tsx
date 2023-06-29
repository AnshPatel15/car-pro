"use client";

import useCars from "@/hooks/useCars";
import { calculateCarRent } from "@/utils";
import { Range } from "react-date-range";
import { BiRupee } from "react-icons/bi";
import ButtonTwo from "../ButtonTwo";
import Container from "../Container";
import Calendar from "../inputs/Calendar";

interface CarReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const CarReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: CarReservationProps) => {
  return (
    <div className=" bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className=" flex flex-row items-center gap-1 p-4">
        <div className="flex flex-row text-2xl font-semibold pt-2">
          <BiRupee className="mt-[5px]" /> {price}
        </div>
        <div className=" mt-3 font-light text-neutral-600 ">/ day</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className=" p-4">
        <ButtonTwo disabled={disabled} label="Add to cart" onClick={onSubmit} />
      </div>
      <div className=" p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div className="flex flex-row text-2xl font-semibold pt-2">
          <BiRupee className="mt-[5px]" /> {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default CarReservation;
