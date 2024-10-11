import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { FAQ, CustomDropdown } from '../main/HeroSection/HeroSection';

const vehicleModels = {
    "Ford": ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Expedition", "Edge", "Ranger", "Maverick", "Super Duty"],
    "Chevrolet": ["Silverado", "Corvette", "Camaro", "Tahoe", "Suburban", "Malibu", "Blazer", "Equinox", "Traverse", "Colorado", "Trailblazer"],
    "Toyota": ["Camry", "Corolla", "RAV4", "Tacoma", "Tundra", "Highlander", "4Runner", "Prius", "Sienna", "Land Cruiser"],
    "Honda": ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "Passport", "HR-V", "Ridgeline", "Insight"],
    "Jeep": ["Wrangler", "Grand Cherokee", "Cherokee", "Gladiator", "Renegade", "Compass", "Wagoneer"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck (Upcoming)", "Roadster (Upcoming)"],
    "Ram": ["1500", "2500", "3500", "ProMaster", "TRX", "ProMaster City"],
    "Nissan": ["Altima", "Sentra", "Rogue", "Murano", "Pathfinder", "Frontier", "Titan", "Maxima", "Armada", "Kicks", "Leaf"],
    "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "4 Series", "M3", "M4", "M4", "Z4", "i3 (Discontinued)", "i4", "iX", "M8"],
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "AMG GT", "EQS (Electric)", "EQE (Electric)"],
    "Subaru": ["Outback", "Forester", "Ascent", "Impreza", "WRX", "Crosstrek", "Legacy", "BRZ"],
    "GMC": ["Sierra 1500", "Sierra 2500HD", "Yukon", "Acadia", "Terrain", "Canyon", "Hummer EV"],
    "Dodge": ["Challenger", "Charger", "Durango", "Journey (Discontinued)", "Hornet", "Viper (Discontinued)", "Grand Caravan (Discontinued)"],
    "Volkswagen": ["Jetta", "Passat", "Golf", "Tiguan", "Atlas", "ID.4 (Electric)", "Arteon", "Taos"],
    "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Kona", "Venue", "Ioniq 5 (Electric)", "Veloster N"],
    "Ferrari": ["488", "F8 Tributo", "SF90 Stradale", "812 Superfast", "Roma", "Portofino", "LaFerrari", "Purosangue (SUV)"],
    "Lamborghini": ["Aventador", "Huracán", "Urus", "Sián", "Revuelto (Upcoming)"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan (Electric)", "718 Boxster", "718 Cayman"],
    "Aston Martin": ["Vantage", "DB11", "DBX", "DBS Superleggera", "Valhalla (Upcoming)", "Valkyrie"],
    "McLaren": ["720S", "570S", "GT", "600LT", "Artura (Hybrid)", "Senna", "Speedtail"],
    "Rolls-Royce": ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan", "Spectre (Upcoming Electric)"],
    "Bentley": ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne (Discontinued)"],
    "Maserati": ["Ghibli", "Quattroporte", "Levante", "MC20", "GranTurismo (Upcoming)"],
    "Bugatti": ["Chiron", "Veyron (Discontinued)", "Divo", "Centodieci", "Bolide"],
    "Lotus": ["Evora", "Elise", "Exige", "Emira",],
};

const FiltersSection = ({ handleClickFilterBtn, searchResults, selectedValues, setSelectedValues, Icon, startDate, endDate, setStartDate, setEndDate, toggleOverlay, clearAllFilters, priceRange, setPriceRange }) => {
    // const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for overlay visibility

    // const toggleOverlay = () => {
    //     setIsOverlayVisible(!isOverlayVisible); // Toggle overlay visibility
    // };

    const [selections, setSelections] = useState([
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
                { id: 1, value: 'Ford', label: 'Ford' },
                { id: 2, value: 'Chevrolet', label: 'Chevrolet' },
                { id: 3, value: 'Toyota', label: 'Toyota'},
                { id: 4, value: 'Honda', label: 'Honda'},
                { id: 5, value: 'Jeep', label: 'Jeep'},
                { id: 6, value: 'Tesla', label: 'Tesla'},
                { id: 7, value: 'Ram', label: 'Ram'},
                { id: 8, value: 'Nissan', label: 'Nissan'},
                { id: 9, value: 'BMW', label: 'BMW'},
                { id: 10, value: 'Mercedes-Benz', label: 'Mercedes-Benz'},
                { id: 11, value: 'Subaru', label: 'Subaru'},
                { id: 12, value: 'GMC', label: 'GMC'},
                { id: 13, value: 'Dodge', label: 'Dodge'},
                { id: 14, value: 'Volkswagen', label: 'Volkswagen'},
                { id: 15, value: 'Hyundai', label: 'Hyundai'},
                { id: 16, value: 'Ferrari', label: 'Ferrari'},
                { id: 17, value: 'Lamborghini', label: 'Lamborghini'},
                { id: 18, value: 'Porsche', label: 'Porsche'},
                { id: 19, value: 'Aston Martin', label: 'Aston Martin'},
                { id: 20, value: 'McLaren', label: 'McLaren'},
                { id: 21, value: 'Rolls-Royce', label: 'Rolls-Royce'},
                { id: 22, value: 'Bentley', label: 'Bentley'},
                { id: 23, value: 'Maserati', label: 'Maserati'},
                { id: 24, value: 'Bugatti', label: 'Bugatti'},
                { id: 25, value: 'Lotus', label: 'Lotus'},
            ],
            default: "All makes",
            width: '362px',
            left: "34px"
        },
        {
            name: "Model",
            options: [
                { value: 'All', label: 'All' }
            ],
            default: "All models",
            width: '190px',
            left: "176px"
        },
        {
            name: "BodyType",
            options: [
                { value: 'All', label: 'All' },
                { value: 'Coupe', label: 'Coupe' },
                { value: 'Sedan', label: 'Sedan' },
                { value: 'SUV', label: 'SUV' },
                { value: 'Crossover', label: 'Crossover' },
                { value: 'Convertible', label: 'Convertible' },
                { value: 'Van', label: 'Van' }
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
    ]);
    const [selectedBrand, setSelectedBrand] = useState(null);


    const handleSelect = (name, value, isSelected) => {
        setSelectedValues(prev => {
            const currentSelections = prev[name] || [];
            if (isSelected) {
                return { ...prev, [name]: [...currentSelections, value] };
            } else {
                return { ...prev, [name]: currentSelections.filter(v => v !== value) };
            }
        });

        if(name === 'Make') {
            setSelectedBrand(value);
        }
    };

    useEffect(() => {
        if (selectedBrand) {
            let tempModels = [];
            vehicleModels[selectedBrand].map(item => {
                tempModels.push({value: item, label: item});
            });
            
            setSelections(prevSelections => {
                return prevSelections.map(selection => {
                    if (selection.name === "Model") {
                        return {
                            ...selection,
                            options: tempModels,
                        };
                    }
                    return selection;
                });
            });
        }
    }, [selectedBrand]);

    

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center fixed top-0 right-0 bg-black' style={{ zIndex: 9999999, backgroundColor: "rgba(0,0,0,0.7)" }}>
            <motion.div
                className='bg-white lg:relative fixed lg:rounded-[10px] rounded-t-[30px] top-0 w-[100vw] pb-10 lg:w-[650px] lg:h-[700px] h-[100vh] left-0 px-[25px]'
                id='filterSection'
                style={{ zIndex: 9999, overflowX: "hidden", overflowY: 'auto' }}
                initial={{ y: '100%' }} // Start from bottom
                animate={{ y: 0 }} // Animate to original position
                exit={{ y: '100%' }} // Exit to bottom
                transition={{ duration: 0.3 }} // Animation duration
            >
                <div className="flex justify-between mt-[37.5px] items-center lg:mb-20 w-[600px]">
                    <div className="text-[30px] font-[700] text-black ">
                        {Icon}
                    </div>
                    <img
                        src={require("../../images/crossSearch.png")}
                        alt=""
                        className='w-[32px] h-[28.84px] cursor-pointer'
                        onClick={toggleOverlay} // Close overlay on click
                    />
                </div>
                <div className="pl-0">
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
                </div>
                <div className="h-[2px] my-20 w-[650px] -ml-6 bg-[#E9E9E9]">

                </div>
                <div className="button flex h-[60px] lg:gap-10 gap-3">
                    <button onClick={handleClickFilterBtn} className='w-full h-[56px] flex justify-center items-center font-[500] bg-black text-white rounded-[10px] lg:text-base text-[14px] mx-auto lg:w-[350px]'>
                        Show results 
                        {/* ({searchResults?.length}) */}
                    </button>
                    <button className='w-full h-[56px] flex justify-center  items-center font-[500]  rounded-[10px] mx-auto lg:w-[350px]'>
                        <div className="flex items-center justify-center gap-3" onClick={clearAllFilters}>
                            <img src={require("../../images/Frame (1).png")} alt="" />
                            <div className="text-[14px] text-black">Clear filters</div>
                        </div>
                    </button>
                    
                </div>
            
            </motion.div>
        </div>
    )
}

export default FiltersSection
