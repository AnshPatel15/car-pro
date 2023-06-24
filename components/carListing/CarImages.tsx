"use client";
import Image from "next/image";
import { generateCarImageUrl } from "@/utils";
import useCars from "@/hooks/useCars";

const CarImages = () => {
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const imgSrc = generateCarImageUrl(car);
  return (
    <div className="carousel w-full">
      <div
        id="slide1"
        className="carousel-item relative w-full flex justify-center items-center "
      >
        <Image
          src={imgSrc}
          className="object-contain"
          alt="Car Image Main"
          width={600}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide2"
        className="carousel-item relative w-full flex justify-center items-center "
      >
        <Image
          src={generateCarImageUrl(car, "33")}
          className="object-contain"
          alt="Car Image Main"
          width={600}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full flex justify-center items-center "
      >
        <Image
          src={generateCarImageUrl(car, "13")}
          className="object-contain"
          alt="Car Image Main"
          width={600}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide4"
        className="carousel-item relative w-full flex justify-center items-center "
      >
        <Image
          src={generateCarImageUrl(car, "29")}
          className=" object-contain"
          alt="Car Image Main"
          width={600}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarImages;
