import React, { useContext, useEffect, useRef, useState } from 'react';
import Row from './Row';
import Modal from './Modal';
import { context } from '../../context/context';

const Main = () => {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [activeSort1, setActiveSort1] = useState('All Categories');
    const [activeSort, setActiveSort] = useState('Body Type');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [rows, setRows] = useState([])

    // Dropdown options
    const dropdownOptions = ['All Types', 'Sedan', 'Cargo Van', 'Convertible', 'Hatchback', 'Mnivan', 'Passenger Van', 'SUV', 'Truck', 'Wagon'];
    const dropdownOptions1 = ['All Categories', 'Sport', 'SUVs ', 'Hatchback', 'Crossover', 'Sedan', 'Electric', 'Hybrid', 'Pickup'];
    const dropdownRef1 = useRef();
    const dropdownRef = useRef();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { fetchDataAdmin } = useContext(context);
    useEffect(() => {
        const init = async () => {
            try {
                const tempUser = JSON.parse(window.localStorage.getItem("user"));
                if(tempUser) {
                    setUser(tempUser);
                }
                const data = await fetchDataAdmin(activeSort1 === "All Categories" ? null : activeSort1, activeSort === "Body Type" || activeSort === "All Types"  ? null : activeSort)
                console.log("Data is ", data)
                setRows(data?.data?.cars);
            } catch (error) {
                console.log("error is here",error)
            }

            // console.log("Data is in admin is ", data.data.cars);
            // 
        }
        init();
    }, [activeSort, activeSort1]);

    const onDelete = (id) => {
        // Remove the deleted car from the state
        setRows((prevCars) => prevCars.filter(car => car.id !== id));
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
                setIsDropdownOpen1(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            {/* Search and User Info */}
            <div className="h-[60px] flex justify-between items-center w-[83vw] overflow-hidden pl-10" style={{ borderBottom: "1px solid #E9E9E9" }}>
                <div className="flex items-center relative">
                    <img src={require("../../images/Frame (4).png")} alt="Search icon" className='absolute top-[19%] left-[10px]' />
                    <input type="text" placeholder='Search' style={{ border: "none", outline: 'none' }} className='text-[16px] ml-10 py-2 w-[500px]' />
                </div>
                <div className="flex gap-5 font-[500] text-[14px] items-center cursor-pointer">
                    <div className="">
                        <img src={require("../../images/Mask group (5).png")} alt="User icon" className='' />
                    </div>
                    <div className="flex items-center">{user && user.name}</div>
                </div>
            </div>

            {/* Heading */}
            <div className="pl-10 mt-[45px] flex justify-between">
                <div className="font-[700] text-[36px]">
                    Your vehicles
                </div>
                <div className="flex gap-2">
                    <div className="flex gap-5 relative cursor-pointer" ref={dropdownRef}>

                        {/* Filter dropdown button */}
                        <div className="p-4 gap-3 text-[14px] font-[500] border rounded-[10px] border-[#E9E9E9] lg:flex hidden" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={require("../../images/filter icon.png")} className='w-[20px] h-[20px]' alt="Filter icon" />
                            <div className="flex gap-10">
                                <div className="text-[14px] font-[500]">
                                    {activeSort}
                                </div>
                                <img src={require("../../images/Frame (2).png")} className='w-[20px] h-[20px]' alt="Dropdown arrow" />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <div className={`sortDropdown w-[252px] flex flex-col justify-center items-center absolute top-16 bg-white rounded-[20px] transition-all duration-300 ${isDropdownOpen ? 'block' : 'hidden'}`} style={{ zIndex: 9999, boxShadow: "0.5px 0.5px 5px #959595 " }} >
                            {dropdownOptions.map((value, index) => (
                                <div key={index} className="text-[#636363] text-[14px] font-[500] py-4 px-3 w-[220px] items-center flex cursor-pointer" onClick={() => {
                                    setActiveSort(value);
                                    setIsDropdownOpen(false); // Close dropdown on selection
                                }}>
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-5 relative cursor-pointer' ref={dropdownRef1}>


                        {/* <div className="p-4 gap-3 text-[14px] font-[500] border rounded-[10px] border-[#E9E9E9] lg:flex hidden" onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}>
                            <img src={require("../../images/filter icon.png")} className='w-[20px] h-[20px]' alt="Filter icon" />
                            <div className="flex gap-10">
                                <div className="text-[14px] font-[500]">
                                    {activeSort1}
                                </div>
                                <img src={require("../../images/Frame (2).png")} className='w-[20px] h-[20px]' alt="Dropdown arrow" />
                            </div>
                        </div> */}

                        {/* Dropdown Menu */}
                        <div className={`sortDropdown w-[252px] flex flex-col justify-center items-center absolute top-16 bg-white  rounded-[20px] transition-all duration-300 ${isDropdownOpen1 ? 'block' : 'hidden'}`} style={{ zIndex: 9999, boxShadow: "0.5px 0.5px 5px #959595 " }} >
                            {dropdownOptions1.map((value, index) => (
                                <div key={index} className="text-[#636363] text-[14px] font-[500] py-4 px-3 w-[220px] items-center flex cursor-pointer" onClick={() => {
                                    setActiveSort1(value);
                                    setIsDropdownOpen1(false); // Close dropdown on selection
                                }}>
                                    {value}
                                </div>
                            ))}
                        </div>

                        {/* Add new vehicle button */}
                        <div
                            className="px-4 flex gap-3 bg-[#FFB600] rounded-[10px] text-white hover:text-black hover:bg-white transition-all duration-300 justify-center items-center cursor-pointer"
                            onClick={openModal} // Open modal on click
                        >
                            <img src={require("../../images/Frame (5).png")} className='w-[20px] h-[20px]' alt="Add icon" />
                            <div className="text-[14px]">
                                Add new vehicle
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Table */}
            <div className="pl-10 w-full mt-10">
                <div className="header w-full bg-[#F8F8F8] h-[40px] px-5 flex items-center">
                    <div className="w-[22%] text-[14px] font-[500] text-[#767676] flex items-center">
                        Vehicle Name
                    </div>
                    <div className="w-[18%] text-[14px] font-[500] text-[#767676] flex items-center">
                        Brand
                    </div>
                    <div className="w-[18%] text-[14px] font-[500] text-[#767676] flex items-center">
                        Engine Details
                    </div>
                    <div className="w-[18%] text-[14px] font-[500] text-[#767676] flex items-center">
                        Price/per month
                    </div>
                    <div className="w-[18%] text-[14px] font-[500] text-[#767676] flex items-center">
                        Vehicle Type
                    </div>
                </div>
                {rows?.map((data, index) => (
                    <Row data={data} key={index} onDelete={onDelete} />
                ))}

                {/* Modal Component */}
                {isModalOpen && <Modal closeModal={closeModal} />}
            </div>
        </div>
    );
};

export default Main;
