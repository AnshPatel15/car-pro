"use client";

import { DesiredCar } from "@/types";
import React, { createContext, useState } from "react";

interface DesiredCarsContextProps {
  desiredCars: DesiredCar[];
  setDesiredCars: React.Dispatch<React.SetStateAction<DesiredCar[]>>;
}

export const DesiredCarsContext = createContext<DesiredCarsContextProps>({
  desiredCars: [],
  setDesiredCars: () => {},
});

export const DesiredCarsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [desiredCars, setDesiredCars] = useState<DesiredCar[]>([]);

  return (
    <DesiredCarsContext.Provider value={{ desiredCars, setDesiredCars }}>
      {children}
    </DesiredCarsContext.Provider>
  );
};
