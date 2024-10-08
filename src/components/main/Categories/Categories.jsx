import React, { useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'

const Categories = () => {
    const [hovered, setHovered] = useState(false);
    const cat = [{
        heading: "Sports",
        image: require('../../../images/catsport.png')
    },
    {
        heading: "SUV",
        image: require('../../../images/321_isolated_realistic_matte_white_modern_high_performance_sport_suv_car_from_right_front_view 1.png')
    },
    {
        heading: "Crossover",
        image: require('../../../images/image 156.png')
    },
    {
        heading: "Sedan",
        image: require('../../../images/315_isolated_realistic_metallic_white_high_performance_racing_super_car_from_left_side_view 1.png')
    },

    {
        heading: "Hatchback",
        image: require('../../../images/image 165.png')
    },

    {
        heading: "Electric",
        image: require('../../../images/image 156-1.png')
    },
    {
        heading: "Hybrid",
        image: require('../../../images/image 158.png')
    },
    {
        heading: "Pickup",
        image: require('../../../images/image 166.png')
    },
    ]
    return (
        <div className="">
            <div className="lg:ml-0 -ml-[5%]">
                <div className='lg:mx-auto md:mx-auto mt-[10%]'>
                    <div className="lg:w-[1340px] flex-wrap md:w-[1340px]  w-[325px] max-w-full  flex lg:justify-center justify-start overflow-hidden items-center mb-10 mx-auto">
                        <div className="text-center heading font-[700] lg:text-[45px] md:text-[45px] text-[35px] w-[501px] text-black">
                            Popular Categories
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 mx-auto justify-center items-center w-full">
                        {cat && cat.map((obj, index) => (
                            <div key={index} className="flex justify-center"> {/* Added flex container for centering */}
                                <Card image={obj.image} heading={obj.heading} />
                            </div>
                        ))}
                    </div>
                    <Link to={'/view'}>
                        <div className="flex justify-center items-center lg:my-0 md:my-0 my-10 lg:mb-0 md:mb-0 mb-[100px] "
                            onMouseEnter={() => setHovered(true)} // Set hover state to true
                            onMouseLeave={() => setHovered(false)}
                        >
                            <button className='w-[340px] h-[44px] rounded-[10px] flex justify-center  items-center text-[14px] mt-[10px] hoverAni3 font-[500] relative'>
                                View All <div className='relative'> <div className='hoverLine2'></div></div> <svg
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
                                        stroke={`${!hovered ? "#000000" : "#FFB600"}`}
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Categories
