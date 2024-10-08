import React, { useState, useRef } from "react";
import Card from "../../General/Card";
import Icon from "./icon/icon";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const Features = ({ heading = "Featured vehicles", slides = 3.5 }) => {
  const [active, setActive] = useState({
    left: "#0E0E0E",
    right: "#0E0E0E",
  });

  const [hovered, setHovered] = useState(false); // State for handling hover

  const swiperRef = useRef(null);

  const cards = [
    {
      name: "2024 Kia Forte LXS 4dr Sedan",
      heading: "Sport cars",
      image: require("../../../images/blackcar.png"),
      price: "839",
      lease: "39 months",
      mile: "8000",
      seat: "4",
      discount: "-40%",
    },
    {
      name: "Mercedes-AMG GT Coupé",
      heading: "Sport cars",
      image: require("../../../images/cardwhite.png"),
      price: "1239",
      lease: "39 months",
      mile: "8000",
      seat: "4",
      discount: "-40%",
    },
    {
      name: "BMW M8 Competition",
      heading: "Sport cars",
      image: require("../../../images/card3.png"),
      price: "1239",
      lease: "39 months",
      mile: "8000",
      seat: "4",
      discount: "-40%",
    },
    {
      name: "2024 Kia Forte LXS 4dr Sedan",
      heading: "Sport cars",
      image: require("../../../images/blackcar.png"),
      price: "839",
      lease: "39 months",
      mile: "8000",
      seat: "4",
      discount: "-40%",
    },
  ]; // Placeholder for card data

  const onClickRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const onClickLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="lg:w-full md:w-full w-[350px]">
      <div className=" container">
        <div className="mt-[10%] overflow-hidden">
          {/* Header Section */}
          <div className="lg:w-full md:w-[95%] w-[350px] max-w-full mx-auto flex justify-between items-center">
            <div
              className="heading font-[700] lg:text-[45px] md:text-[45px] text-[35px]  text-black "
              style={{ letterSpacing: "-1px" }}
            >
              {heading}
            </div>
            <div className=" gap-2 px-7 lg:flex md:flex hidden">
              <motion.div
                className="bg-lightgray w-[44px] h-[44px] flex justify-center items-center rounded-full featureLeftIcon transition-all duration-300"
                onClick={onClickLeft}
                onHoverStart={() => {
                  setActive({
                    left: "#fff",
                    right: "#0E0E0E",
                  });
                }}
                onHoverEnd={() => {
                  setActive({
                    left: "#0E0E0E",
                    right: "#0E0E0E",
                  });
                }}
              >
                <div className="featureLeftIconInner transition-all duration-200">
                  <Icon color={active.left} />
                </div>
                <div className="featureLeftLine transition-all duration-200 absolute"></div>
              </motion.div>

              <div
                className="bg-lightgray w-[44px] h-[44px] flex justify-center items-center rounded-full transition-all duration-300 featureLeftIcon"
                onClick={onClickRight}
                onMouseEnter={() => {
                  setActive({
                    left: "#0E0E0E",
                    right: "#fff",
                  });
                }}
                onMouseLeave={() => {
                  setActive({
                    left: "#0E0E0E",
                    right: "#0E0E0E",
                  });
                }}
              >
                <div className="rotate-180 transition-all duration-200 featureRightInner">
                  <Icon color={active.right} />
                </div>
                <div className="featureLeftLine transition-all duration-200 absolute"></div>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex lg:gap-5 gap-[6px] lg:w-full md:w-full w-auto max-w-full overflow-hidden mx-auto -z-20 ">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
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
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1441: {
                  slidesPerView: slides,
                  spaceBetween: 20,
                },
              }}
              style={{zIndex: -1}}
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <Card obj={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* View All Button */}
          <div className="flex justify-center items-center">
            <Link to="/view">
              <button
                className="lg:w-[340px] md:w-[340px] w-[325px] h-[44px] rounded-[10px] flex justify-center items-center text-[14px] mt-[10px] hoverAni6 font-[500] relative"
                onMouseEnter={() => setHovered(true)} // Set hover state to true
                onMouseLeave={() => setHovered(false)} // Set hover state to false
              >
                View All Vehicles{" "}
                <div className="relative">
                  <div className="hoverLine2"></div>
                </div>
                <svg
                  className="hoverSVG w-[10px] h-[10px] ml-2 imahe1"
                  width="9"
                  height="13"
                  viewBox="0 0 9 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 6.5L1 12"
                    className="svgPath"
                    stroke={`${!hovered? "#000000": "#FFB600"}`}
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
