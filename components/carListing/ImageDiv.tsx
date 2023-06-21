import useCars from "@/hooks/useCars";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import CustomButton from "../CustomButton";

const ImageDiv = () => {
  const selectedCar = useCars((state) => state.selectedCar);
  const car = selectedCar || {};
  const carRent = calculateCarRent(car.city_mpg, car.year);

  const [images, setImages] = useState({
    img1: generateCarImageUrl(car),
    img2: generateCarImageUrl(car, "29"),
    img3: generateCarImageUrl(car, "33"),
    img4: generateCarImageUrl(car, "13"),
  });

  const [activeImage, setActiveImage] = useState(images.img1);

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-4 md:items-center lg:items-start">
      <div className=" my-28 w-full h-full flex flex-col gap-6  md:w-2/3 lg:w-2/4">
        <Image
          src={activeImage}
          alt=""
          width={600}
          height={300}
          className="aspect-square object-contain rounded-xl bg-gray-100 self-center"
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
            {car.make} {car.model}
          </h1>
          <p className=" text-gray-600 p-3">
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
          <h6 className="flex flex-row text-2xl font-semibold pt-2">
            <BiRupee className="mt-[4px]" size={25} /> {carRent}
          </h6>
          <div className=" pt-4">
            <CustomButton
              title="Add to Cart"
              btnType="submit"
              containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              handleClick={() => {}}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDiv;
