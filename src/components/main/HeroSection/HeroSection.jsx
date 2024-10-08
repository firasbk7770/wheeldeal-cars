import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './HeroSection.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './RangeSlider.css'
// import { img } from 'framer-motion/client';
// import Jeep from './icons/Jeep';
// import Merce from './icons/Merce';
import CircleIcon from './icons/Circle';
import AIcon from './icons/AIcon';
import Benz from './icons/Benz';
import Tesla from './icons/Tesla';

import Oval from './icons/Oval'
import OvalO from './icons/OvalO';
// import Hunda from './icons/Hunda';
// import VerticalBox from './icons/VerticalBox';
// import Animal from './icons/Animal';
import KN from './icons/KN';
import Bugati from './icons/Bugati';
// import OvalArrow from './icons/OvalArrow';
// import OvalTriangle from './icons/OvalTriangle';
// import DoubleTriangle from './icons/DoubleTriangle';
// import CircleImage from './icons/CircleImage';
// import Suzuki from './icons/Suzuki'
// import DoubleLine from './icons/DoubleLine'
// import DotTriangle from './icons/DotTriangle'
// import Hunda2 from './icons/Hunda2'
import All from './icons/All';
// import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'; // Import new icons
import { context } from '../../../context/context';
import { div } from 'framer-motion/client';


export const RangeSlider = ({ min, max, value, step, onChange }) => {
    const [minValue, setMinValue] = useState(value ? value.min : min);
    const [maxValue, setMaxValue] = useState(value ? value.max : max);
    const sliderTrackRef = useRef(null);

    useEffect(() => {
        if (value) {
            setMinValue(value.min);
            setMaxValue(value.max);
        }
    }, [value]);

    const handleMinChange = (newMinVal) => {
        const updatedMin = Math.min(newMinVal, maxValue - step);
        setMinValue(updatedMin);
        onChange({ min: updatedMin, max: maxValue });
    };

    const handleMaxChange = (newMaxVal) => {
        const updatedMax = Math.max(newMaxVal, minValue + step);
        setMaxValue(updatedMax);
        onChange({ min: minValue, max: updatedMax });
    };

    const handleThumbMove = (e, type, isTouch = false) => {
        if (!sliderTrackRef.current) return; // Ensure the slider track is available
        const sliderRect = sliderTrackRef.current.getBoundingClientRect();
        const sliderWidth = sliderRect.width;

        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const relativeX = clientX - sliderRect.left;
        const newValue = (relativeX / sliderWidth) * (max - min) + min;

        if (type === 'min') {
            handleMinChange(Math.max(min, Math.min(newValue, maxValue - step)));
        } else if (type === 'max') {
            handleMaxChange(Math.min(max, Math.max(newValue, minValue + step)));
        }
    };

    const startThumbMove = (e, type, isTouch = false) => {
        const moveEvent = isTouch ? 'touchmove' : 'mousemove';
        const endEvent = isTouch ? 'touchend' : 'mouseup';

        const onMove = (event) => handleThumbMove(event, type, isTouch);
        const onEnd = () => {
            document.removeEventListener(moveEvent, onMove);
            document.removeEventListener(endEvent, onEnd);
        };

        document.addEventListener(moveEvent, onMove);
        document.addEventListener(endEvent, onEnd, { once: true });
    };

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    return (
        <div className="slider-container relative  h-[170px]  text-white  bg-[#2C2C2C]">
            <div className="mt-[14.35px] text-[14px] font-[500] text-white flex items-center justify-between">Price range
                <div className="">
                    <img src={require("../../../images/Frame (8).png")} alt="" />
            </div></div>

            {/* Slider track with min/max labels */}
            <div className="relative flex items-center">
                {/* <span className="absolute left-0 text-sm font-medium text-gray-500">${min}</span> */}
                <div className="slider-track relative w-full h-1 mx-4 rounded" ref={sliderTrackRef}>
                    <div className="bg-lightgray absolute top-[6px] h-1 w-full"></div>
                    <div
                        className="slider-range absolute bg-blue-500 h-2"
                        style={{
                            left: `${minPos}%`,
                            width: `${maxPos - minPos}%`,
                        }}
                    />
                    {/* Thumbs */}
                    <div
                        className="slider-thumb absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                        style={{ left: `calc(${minPos}% - 8px)` }}
                        onMouseDown={(e) => startThumbMove(e, 'min')}
                        onTouchStart={(e) => startThumbMove(e, 'min', true)}
                    />
                    <div
                        className="slider-thumb absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                        style={{ left: `calc(${maxPos}% - 8px)` }}
                        onMouseDown={(e) => startThumbMove(e, 'max')}
                        onTouchStart={(e) => startThumbMove(e, 'max', true)}
                    />
                </div>
                {/* <span className="absolute right-0 text-sm font-medium text-gray-500">${max}</span> */}
            </div>

            {/* Displaying selected min/max values */}
            <div className="ranges py-5 flex justify-between">
                <div className="flex flex-col justify-center items-center text-gray-500">
                    <span className="font-medium text-sm">Min</span>
                    <div className="px-3 py-3 bg-gray-100 rounded-xl">${minValue.toFixed(2)}</div>
                </div>
                <div className="flex flex-col justify-center items-center text-gray-500">
                    <span className="font-medium text-sm">Max</span>
                    <div className="px-3 py-3 bg-gray-100 rounded-xl">${maxValue.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
};






export const CustomDropdown = ({ options, defaultText, selectedValues, onSelect, width, name, left, priceRange, handlePriceChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredValue, setHoveredValue] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value, label) => {
        if (selectedValues.includes(value)) {
            onSelect(value, false); // Deselect
        } else {
            onSelect(value, true); // Select
        }
    };

    return (
        <div className="w-[166px] " ref={dropdownRef}>
            <div
                className={styles.customSelect}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className='text-change'>
                    {defaultText}
                </span>
                <img src={require("../../../images/heroicon.png")} className='w-[20px] h-[20px] text-img1' alt="" />
                <img src={require("../../../images/coloricondown.png")} className='w-[20px] h-[20px] text-img2 hidden rotate-180' alt="" />
            </div>

            {/* Animate dropdown appearance */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10, }} // Start hidden and slightly above
                        animate={{ opacity: 1, y: 0 }} // Animate to visible and positioned correctly
                        exit={{ opacity: 0, y: -10 }} // Animate exit
                        transition={{ duration: 0.3 }} // Control the speed of the animation
                        className={`flex absolute justify-start items-center bg-white text-black flex-wrap top-[90px] rounded-2xl p-3 font-[500] gap-[5px] ${name === "Price"? 'bg-[#2C2C2C]': ''}`}
                        style={{ width: width, left: left, backgroundColor: name === "Price"? "#2C2C2C": "white" }}
                    >
                        {name === "Make"

                            ? <div className='grid grid-cols-2 py-2 z-20' style={{ zIndex: 9999999 }}> {options.map((option) => (

                                <li
                                    key={option.value}
                                    className={`${styles.option} ${selectedValues.includes(option.value) ? styles.selected : ''}`}
                                    onClick={() => toggleOption(option.value, option.label)}
                                    onMouseEnter={() => setHoveredValue(option.value)}
                                    onMouseLeave={() => setHoveredValue(null)}
                                >
                                    {option.value}
                                    <div className="">
                                        <img src={require("../../../images/Vector (1).png")} alt="" />
                                    </div>
                                </li>

                            ))}
                            </div>
                            : name === "Price" ? (
                                <li className="bg-[#2C2C2C] w-[401px]">
                                    <RangeSlider
                                        min={0}
                                        max={5000}
                                        value={priceRange}
                                        step={1}
                                        onChange={handlePriceChange}
                                    />
                                </li>
                            ) : (
                                <div>
                                    {options.map((option) => (

                                        <li
                                            key={option.value}
                                            className={`${styles.option} ${selectedValues.includes(option.value) ? styles.selected : ''}`}
                                            onClick={() => toggleOption(option.value, option.label)}
                                            onMouseEnter={() => setHoveredValue(option.value)}
                                            onMouseLeave={() => setHoveredValue(null)}
                                        >
                                            {option.value}
                                            <div className="">
                                                <img src={require("../../../images/Vector (1).png")} alt="" />
                                            </div>
                                        </li>

                                    ))}
                                </div>
                            )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export const selections = [
    // {
    //     name: "Categories",
    //     options: [
    //         { value: 'Sport', label: 'Sport' },
    //         { value: 'SUVs', label: 'SUVs' },
    //         { value: 'Hatchback', label: 'Hatchback' },
    //         { value: 'Crossover', label: 'Crossover' },
    //         { value: 'Sedan', label: 'Sedan' },
    //         { value: 'Electric', label: 'Electric' },
    //         { value: 'Hybrid', label: 'Hybrid' },
    //         { value: 'Pickup', label: 'Pickup' },
    //     ],
    //     default: "All categories",
    //     width: '500px',
    //     left: "0px"
    // },
    {
        name: "Make",
        options: [
            { id: 1, value: 'Ford' },
            { id: 2, value: 'Chevrolet' },
            { id: 3, value: 'Toyota' },
            { id: 4, value: 'Honda' },
            { id: 5, value: 'Jeep' },
            { id: 6, value: 'Tesla' },
            { id: 7, value: 'Ram' },
            { id: 8, value: 'Nissan' },
            { id: 9, value: 'BMW' },
            { id: 10, value: 'Mercedes-Benz' },
            { id: 11, value: 'Subaru' },
            { id: 12, value: 'GMC' },
            { id: 13, value: 'Dodge' },
            { id: 14, value: 'Volkswagen' },
            { id: 15, value: 'Hyundai' },
            { id: 16, value: 'Ferrari' },
            { id: 17, value: 'Lamborghini' },
            { id: 18, value: 'Porsche' },
            { id: 19, value: 'Aston Martin' },
            { id: 20, value: 'McLaren' },
            { id: 21, value: 'Rolls-Royce' },
            { id: 22, value: 'Bentley' },
            { id: 23, value: 'Maserati' },
            { id: 24, value: 'Bugatti' },
            { id: 25, value: 'Lotus' },
        ],
        default: "All makes",
        width: '362px',
        left: "34px"
    },
    {
        name: "Model",
        options: [
            { value: 'All', label: 'All' },
            { value: 'Model Y', label: 'Model Y' },
            { value: 'Model S', label: 'Model S' },
            { value: 'Cybertruck', label: 'Cybertruck' }
            // { value: 'Sorento', label: 'Sorento' },
            // { value: 'Seltos', label: 'Seltos' },
            // { value: 'Telluride', label: 'Telluride' },
            // { value: 'Soul', label: 'Soul' },
            // { value: 'Niro', label: 'Niro' },
            // { value: 'EV6', label: 'EV6' },
            // { value: 'Stinger', label: 'Stinger' },
            // { value: 'Forte', label: 'Forte' },
            // { value: 'K5', label: 'K5' },
            // { value: 'Rio', label: 'Rio' },
            // { value: 'Optima', label: 'Optima' },
            // { value: 'Cadenza', label: 'Cadenza' },
            // { value: 'Picanto', label: 'Picanto' },
            // { value: 'XCeed', label: 'XCeed' },
            // { value: 'ProCeed', label: 'ProCeed' },
        ],
        default: "All models",
        width: '190px',
        left: "176px"
    },
    {
        name: "BodyType",
        options: [
            { value: 'All', label: 'All' },
            { value: 'Sedan', label: 'Sedan' },
            { value: 'Cargo Van', label: 'Cargo Van' },
            { value: 'Convertible', label: 'Convertible' },
            { value: 'Hatchback', label: 'Hatchback' },
            { value: 'Mnivan', label: 'Mnivan' },
            { value: 'Passenger Van', label: 'Passenger Van' },
            { value: 'SUV', label: 'SUV' },
            { value: 'Truck', label: 'Truck' },
            { value: 'Wagon', label: 'Wagon' },
        ],
        default: "All types",
        width: '190px',
        left: "404px"
    },
    {
        name: "Price",
        options: [
            { value: '0-20000', label: '$0 - $20,000' },
            { value: '20000-40000', label: '$20,000 - $40,000' },
            { value: '40000+', label: '$40,000+' },
        ],
        default: "Any price",
        width: '441px',
        left: "554px"
    }
];


const HeroSection = () => {
    const navigate = useNavigate();
    const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for overlay visibility

    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible); // Toggle overlay visibility
    };

    // const [openDropdown, setOpenDropdown] = useState(null);
    // const [selectedValues, setSelectedValues] = useState({
    //     Make: ['All'],  // "All" is selected by default for "Make"
    //     Categories: [],
    //     Model: [],
    //     Year: [],
    //     Price: []
    // });

    const { selectedValues, setSelectedValues, priceRange, setPriceRange, isFilter, setIsFilter } = useContext(context)

    // const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };


    const handleSelect = (name, value, isSelected) => {
        setSelectedValues(prev => {
            const currentSelections = prev[name] || [];
            if (isSelected) {
                return { ...prev, [name]: [...currentSelections, value] };
            } else {
                return { ...prev, [name]: currentSelections.filter(v => v !== value) };
            }
        });
    };

    const handleFilterBtn = () => {
        setIsFilter(!isFilter);
        navigate("/view");
    }

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className='w-full h-[720px]  bg-black lg:p-[60px] md:p-[60px] p-[25px] flex justify-center'>
            <div className="w-[100%] h-[632px] relative ">
                <div className="absolute left-[4%] lg:top-[40px] md:top-[40px] top-[30px] space-y-5" style={{ zIndex: 9999 }}>
                    <img src={require("../../../images/tiktok.png")} alt="" className='w-[18px] h-[18px] space-y-5 ' />
                    <img src={require("../../../images/insta2.png")} alt="" className='w-[18px] h-[18px]  ' />
                    <img src={require("../../../images/solidfb.png")} alt="" className='w-[18px] h-[18px]  ' />
                </div>
                <img src={require("../../../images/hero.png")} style={{ borderRadius: '22px' }} className='w-full h-[632px] lg:block md:block hidden' alt="" />

                <img src={require("../../../images/responsiveHeroImage.png")} className='w-full h-[652px] lg:hidden md:hidden block' alt="" style={{ filter: "brightness(0.5)", borderRadius: '22px' }} />
                <div className="samllText absolute  lg:w-[560px] md:w-[460px] w-[219px] lg:right-[5%] md:right-[5%] right-[32px] lg:top-[50px]md:top-[50px] top-[30px] text-[8.76px] text-white lg:text-right md:text-right text-center font-[300] leading-[1.5] lg:opacity-100 opacity-50">
                    Explore our exclusive collection of exotic cars, each meticulously chosen to represent the epitome of automotive <br /> engineering and design. From sleek sports cars to powerful luxury SUVs, our selection caters to every discerning taste.
                </div>
                <div className="heading lg:w-[1030px] w-[325px] absolute top-[22%] left-[50%] transform -translate-x-1/2  text-white flex flex-col items-center">
                    <div className='font-[700] lg:text-[60px] text-[35px] text-center tracking-[0.02em] leading-[1.1] lg:w-[950px] w-[300px] lg:mt-0 mt-[70px] lg:ml-0 ml-[10px]'>
                        Drive Your Dreams with The Wheel Deal Auto Leasing
                    </div>
                    <br />
                    <div className="lg:text-[16px] text-[12px] font-[500] text-center">
                        Discover the perfect vehicle for you with our seamless leasing experience.
                    </div>

                    <div className=" relative w-[1030px] h-[78px] bg-white rounded-[15px] mt-10  justify-between items-center lg:flex hidden pl-5">
                        {selections.map((sel) => (
                            <div key={sel.name} className="hoverBox w-[166px] hover:bg-lightgray transition-all duration-200 rounded">
                                <div className="ml-[16px] text-start font-[500] text-[12px] text-[#797979] mt-[4px] ">
                                    {sel.name}
                                </div>
                                <div className=" ml-[16px] -mt-[4px]">
                                    <CustomDropdown
                                        options={sel.options}
                                        defaultText={sel.default}
                                        selectedValues={selectedValues[sel.name] || []}
                                        onSelect={(value, isSelected) => handleSelect(sel.name, value, isSelected)}
                                        width={sel.width}
                                        handlePriceChange={setPriceRange}
                                        priceRange={priceRange}
                                        name={sel.name}
                                        left={sel.left}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="">
                            <button onClick={() => handleFilterBtn()} className='w-[162px] h-[56px] flex justify-center items-center bg-[#000] text-[16px] font-[500] rounded-[10px] mx-[15px]
                            hover:bg-[#F6B000] transition-all duration-300'>
                                Browse vehicles
                            </button>
                        </div>
                    </div>
                    <div className="w-[285px] mt-[60px] h-[60px] ml-[20px] bg-white px-2 flex items-center rounded-[15px] lg:hidden md:hidden" onClick={toggleOverlay}>
                        <img src={require('../../../images/SeachIcon.png')} alt="" className='w-[44px] h-[44px]' />
                        <div className="text-[16px] font-[500] text-[#000000] ml-5">
                            Search for a car...
                        </div>
                    </div>
                </div>
                {isOverlayVisible && (
                    <motion.div
                        className='bg-white fixed rounded-t-[30px] top-0 w-[100vw] left-0 px-[25px]'
                        style={{ zIndex: 999999, height: '100vh', width: "100vw", overflowX: "hidden", overflowY: 'auto' }}
                        initial={{ y: '100%' }} // Start from bottom
                        animate={{ y: 0 }} // Animate to original position
                        exit={{ y: '100%' }} // Exit to bottom
                        transition={{ duration: 0.3 }} // Animation duration
                    >
                        <div className="flex justify-between mt-[37.5px] items-center">
                            <div className="text-[30px] font-[700] text-black">
                                Search
                            </div>
                            <img
                                src={require("../../../images/crossSearch.png")}
                                alt=""
                                className='w-[32px] h-[28.84px]'
                                onClick={toggleOverlay} // Close overlay on click
                            />
                        </div>

                        <FAQ
                            selections={selections}
                            priceRange={priceRange}
                            handlePriceChange={handlePriceChange}
                            selectedValues={selectedValues}
                            onSelect={handleSelect}
                            startDate={startDate}
                            setEndDate={setEndDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                        />
                        <div className="button">
                            <button onClick={() => handleFilterBtn()} className='w-full h-[56px] flex justify-center items-center font-[500] bg-black text-white rounded-[10px] mt-20 mx-auto'>
                                Show results
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

        </div>
    )
}

export default HeroSection



export const FAQ = ({ selectedValues, priceRange, handlePriceChange, selections, onSelect, startDate, setStartDate, endDate, setEndDate }) => {


    const selectionsWithDate = [
        // {
        //     name: "Date",
        //     options: []
        // },
        ...selections
    ];

    const [openQuestions, setOpenQuestions] = useState([]);
    const [hoveredValue, setHoveredValue] = useState(null);

    const toggleQuestion = (index) => {
        if (openQuestions.includes(index)) {
            setOpenQuestions(openQuestions.filter((q) => q !== index));
        } else {
            setOpenQuestions([...openQuestions, index]);
        }
    };

    const toggleOption = (name, value, label) => {
        const currentSelections = selectedValues[name] || []; // Ensure currentSelections is an array
        if (currentSelections.includes(value)) { // Use currentSelections instead
            onSelect(name, value, false); // Deselect
        } else {
            onSelect(name, value, true); // Select
        }
    };

    return (
        <div className="lg:-mt-10 md:-mt-10 mt-[10%]">
            <div className="lg:w-[600px] md:w-[600px] w-[325px] mx-auto">



                {selectionsWithDate.map((selection, index) => (
                    <div key={selection.name} className="w-full ">
                        <div className="w-full my-5" />
                        <div
                            className={`flex justify-between items-center w-full pb-2 cursor-pointer 
                                border-b lg:border-[#E9E9E9]  transition-all duration-300
                                `}
                            onClick={() => toggleQuestion(index)}
                        >
                            <div>
                                <p className={`lg:text-[18px] py-2 md:text-[18px] text-[16px]  font-[700] text-start text-[#636363]`} >
                                    {selection.name === "BodyType" ? "Body Type" : selection.name}
                                </p>
                            </div>
                            <button
                                aria-label="toggler"
                                className="focus:outline-none"
                                onClick={() => toggleQuestion(index)}
                            >
                                {openQuestions.includes(index) ? (
                                    <img src={require("../../../images/dateupicons.png")} alt='date' className='w-[24px] h-[24px]  rotate-180' />
                                ) : (
                                    <img src={require("../../../images/dateupicons.png")} alt='date' className='w-[24px] h-[24px]' />
                                )}
                            </button>
                        </div>
                        <div className={`${openQuestions.includes(index) ? 'block' : 'hidden'} mt-6 w-full`}>
                            <motion.ul
                                initial={{ opacity: 0, y: -10, x: -10 }} // Start hidden and slightly above
                                animate={{ opacity: 1, y: 0, x: 0 }} // Animate to visible and positioned correctly
                                exit={{ opacity: 0, y: -10 }} // Animate exit
                                transition={{ duration: 0.3 }} // Control the speed of the animation
                                className={`flex justify-start items-center bg-white text-black flex-wrap font-[500] gap-[5px]`}
                            >
                                {selection.name === "Make"
                                    ? selection.options.map((option) => (
                                        <li
                                            key={option.value}
                                            className="rounded-full w-[80px]"
                                            onClick={() => toggleOption(selection.name, option.value, option.label)}
                                            onMouseEnter={() => setHoveredValue(option.value)}
                                            onMouseLeave={() => setHoveredValue(null)}
                                        >
                                            {React.cloneElement(option.label, {
                                                bg: selectedValues[selection.name] && selectedValues[selection.name].includes(option.value) ? "black" : (hoveredValue === option.value ? "#F0F0F0" : "white"),
                                                color: selectedValues[selection.name] && selectedValues[selection.name].includes(option.value) ? "white" : (hoveredValue === option.value ? "#B9B9B9" : "#B9B9B9")
                                            })}
                                        </li>
                                    ))
                                    : selection.name === "Price" ? (
                                        <li className="w-[100%] -ml-[4%]">
                                            <RangeSlider
                                                min={0}
                                                max={5000}
                                                value={priceRange}
                                                step={1}
                                                onChange={handlePriceChange}
                                            />
                                        </li>
                                    ) : selection.name === "Date" ? (
                                        <div className="w-full space-y-4 filter-datepickers">
                                            <div className="text-[#767676] w-[100%]">
                                                <div className='text-[12px] text-[#767676] font-[500] flex gap-3 space-y-2 mb-2'>
                                                    <img src={require("../../../images/calender.png")} alt="" className='w-[16px] h-[16px]' />
                                                    Select pick-up date:
                                                </div>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="yyyy/MM/dd"
                                                    placeholderText="YYYY / MM / DD"
                                                    className="bg-lightgray rounded-[10px] p-3 outline-none w-full"
                                                />
                                            </div>
                                            <div className="text-[#767676] w-[100%]">
                                                <div className='text-[12px] text-[#767676] font-[500] flex gap-3 space-y-2 mb-2'>
                                                    <img src={require("../../../images/calender.png")} alt="" className='w-[16px] h-[16px]' />
                                                    Select pick-up date:
                                                </div>
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    dateFormat="yyyy/MM/dd"
                                                    placeholderText="YYYY / MM / DD"
                                                    className="bg-lightgray rounded-[10px] p-3 outline-none w-[100%]"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* {selection.name !== "Categories" && <li
                                                className={`${styles.option} ${selectedValues[selection.name] && selectedValues[selection.name].length === 0 ? styles.selected : ''}`}
                                                onClick={() => toggleOption(selection.name, "All", "All")}
                                            >
                                                All
                                            </li>} */}
                                            {
                                                selection.options.map((option) => (
                                                    <li
                                                        key={option.value}
                                                        className={`${styles.option} ${selectedValues[selection.name] && selectedValues[selection.name].includes(option.value) ? styles.selected : ''}`}
                                                        onClick={() => toggleOption(selection.name, option.value, option.label)}
                                                    >
                                                        {option.label}
                                                    </li>
                                                ))
                                            }
                                        </>
                                    )}
                            </motion.ul>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};