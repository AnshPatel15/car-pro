import { create } from "zustand";

interface useCarsStore {
  selectedCar: any;
  cars: any[];
  setSelectedCar: (selectedCar: any) => void;
  setCars: (cars: any[]) => void;
}

const useCars = create<useCarsStore>((set) => {
  // Retrieve the selectedCar from local storage, if it exists
  const selectedCarFromStorage = localStorage.getItem("selectedCar");

  return {
    cars: [],
    selectedCar: selectedCarFromStorage
      ? JSON.parse(selectedCarFromStorage)
      : {},
    setCars: (cars) => set((state) => ({ ...state, cars })),
    setSelectedCar: (selectedCar) => {
      // Save the selectedCar to local storage
      localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
      set((state) => ({ ...state, selectedCar }));
    },
  };
});

export default useCars;
