import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const CarDetailsHero = (props) => {
  const swiperRef = useRef(null);

  const images = [
    require("../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1 (1).png"),
    require("../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1 (1).png"),
    require("../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1 (1).png"),
    require("../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1 (1).png"),
    require("../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1 (1).png"),
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(props.car && props.car.photos[0]);
  }, [props]);

  return (
    <div className="lg:mb-20 mb-12 flex flex-col items-center">
      <div className="lg:h-[493px] h-[768px] bg-[#383838] lg:w-full w-[95%] lg:flex-row flex-col rounded-[38px] mb-10 flex items-center relative px-10">
        <div className="imageSection carDetailsImages  lg:mt-0 lg:w-[738px]  bg-white rounded-[30px] flex items-center lg:h-[370px] w-[119%] mt-6">
          <img
            src={selectedImage}
            alt="Selected Car"
            className="lg:w-[738px] w-[119%] lg:h-[280px] h-[200px] py-[30px] lg:block hidden"
          />

          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            speed={1000}
            grabCursor={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            style={{
              "--swiper-pagination-color": "black",
              "--swiper-pagination-bullet-inactive-color": "#E6E6E6",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "8.5px",
              "--swiper-pagination-bullet-horizontal-gap": "3px",
            }}
          >
            {props.car &&
              props.car.photos.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    onClick={() => setSelectedImage(image)}
                    src={image}
                    alt={`Car ${index + 1}`}
                    className="lg:w-[738px] w-[119%] lg:h-[280px] h-[200px] py-[30px]"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="content px-[6.4%] lg:ml-0 ml-2 lg:mt-0 mt-14 lg:justify-start justify-center">
          <div className="tag text-[#959595] text-[14px] font-[500]">
            {props.car && props.car.category} car
          </div>
          <div className="heading lg:text-[36px] text-[25px] lg:mt-[40px] mt-[20px] font-[700] text-white">
            {props.car?.name}
          </div>
          <div className="flex gap-5 text-white text-[12px] mt-3">
            <div className="">
              <span className="text-[#959595] text-[12px] font-[500]">
                Lease term:{" "}
              </span>
              {props.car?.leaseTerm}
            </div>
            <div className="">
              <span className="text-[#959595] text-[12px] font-[500]">
                Miles per year:{" "}
              </span>
              {props.car?.miles}
            </div>
          </div>
          <div className="text-white text-[36px] font-[700] mt-3">
            {props.car?.monthly_payment}$ <span className="text-[12px] font-[500]">/ month</span>
          </div>

          <div className="lg:absolute bottom-10 right-10">
            <div className="lg:w-[112px] w-[277px] h-[39px] flex justify-between items-center rounded-[10px] border border-[#959595] px-2 mt-2">
              <div className="text-[#fff] font-[500] text-[12px]">{props.car?.seats} Seats</div>
              <img
                src={require("../../../images/chair.png")}
                className="w-[19px] h-[19px]"
                alt=""
              />
            </div>
            <div className="lg:w-[112px] w-[277px] h-[39px] flex justify-between items-center rounded-[10px] border border-[#959595] px-2 mt-2">
              <div className="text-[#fff] font-[500] text-[12px]">
                {props.car?.transType}
              </div>
              <img
                src={require("../../../images/automatic.png")}
                className="w-[19px] h-[19px]"
                alt=""
              />
            </div>
            <div className="lg:w-[112px] w-[277px] h-[39px] flex justify-between items-center rounded-[10px] border border-[#959595] px-2 mt-2">
              <div className="text-[#fff] font-[500] text-[12px]">I-{props.car?.cylinder} cyl</div>
              <img
                src={require("../../../images/engine-motor-icon 1 (1).png")}
                className="w-[19px] h-[19px]"
                alt=""
              />
            </div>
          </div>

          <div className="button  lg:mt-5 mt-10">
            <button className="lg:w-[251px] w-[277px] h-[56px] flex justify-center items-center p-[22px, 18px, 18px, 18px] rounded-[10px] bg-white text-black text-[16px] font-[500] transition-all duration-300 hover:bg-[#F6B000] hover:text-white">
              Request a quote
            </button>
          </div>
        </div>
      </div>

      <div
        className=" lg:flex justify-between hidden container"
        style={{ justifyContent: "space-between" }}
      >
        <div className="flex lg:gap-5 gap-[6px] lg:w-full md:w-full w-auto max-w-full overflow-hidden mx-auto ">
          {/* Apply drag to all cards */}
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            speed={1000}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 28,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1441: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {props.car &&
              props.car.photos.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image)} // Update the selected image when clicked
                    className="w-[24%] cursor-pointer h-[240px] bg-lightgray rounded-[30px] flex justify-center items-center w-full"
                  >
                    <img
                      src={image}
                      alt={`Car ${index + 1}`}
                      className="w-[243px] h-[100px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            {props.car &&
              props.car.photos.length < 4 &&
              Array.from({ length: 4 - props.car.photos.length }).map(
                (_, index) => (
                  <SwiperSlide key={`empty-${index}`}>
                    <div className="w-full h-[240px] bg-transparent"></div>{" "}
                    {/* Empty slide */}
                  </SwiperSlide>
                )
              )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsHero;
