import { create } from "zustand";

interface useCarsStore {
  selectedCar: any;
  cars: [];
  setSelectedCar: (selectedCar: any) => void;
  setCar: (cars: any) => void;
}

const useCars = create<useCarsStore>((set) => ({
  cars: [],
  selectedCar: {},
  setCar: (cars) => set((state) => ({ ...state, cars: cars })),
  setSelectedCar: (selectedCar) => {
    set((state) => ({ ...state, selectedCar: selectedCar }));
  },
}));

export default useCars;
