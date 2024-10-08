import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ obj }) => {
    const { id, image, discount, seat, heading, name, lease, mile, price, transType } = obj;
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}  // Starts below the screen
            animate={{ opacity: 1, y: 0 }}   // Animates into view from the bottom
            exit={{ opacity: 0, y: -50 }}    // Exits by moving up and disappearing
            transition={{ duration: 0.5, ease: "easeInOut" }}  // Animation speed and easing
            className='mainCard 2xl:h-[605px] 2xl:w-[31.8%] lg:w-[31.5%] md:w-[400px] w-[320px] lg:h-[580px] md:h-[580px] h-[510px] p-[18px] rounded-[15px] border border-[#E9E9E9] my-4 bg-white cursor-pointer md:mr-[20px] mr-[0px]'
        >
            {/* Card content here */}
            <div className="cardNav text-[#959595] font-[500] text-[12px] flex justify-between items-center">
                <div className=" w-[70px] h-[35px] p-[8px, 10px, 6px, 10px] bg-[#FFE39E] text-[17px] font-[700] text-black rounded-[8px] flex justify-center items-center">
                    {discount}
                </div>
                <div className="flex lg:gap-3 md:gap-4 gap-2">
                    <div className=" flex gap-[5px] ">
                        <img src={require('../../images/chair.png')} className='w-[19px] h-[19px] object-contain' alt="" />
                        <div className="lg:text-base md:text-base text-[12px]">
                            {seat} seats
                        </div>
                    </div>
                    <div className=" flex gap-[5px] ">
                        <img src={require('../../images/automatic.png')} className='w-[19px] h-[19px]' alt="" />
                        <div className="lg:text-base md:text-base text-[12px]">
                            {transType}
                        </div>
                    </div>
                </div>
            </div>

            <div className="imageSection relative mt-3">
                <img src={image} alt="" className='2xl:w-[95%] 2xl:h-[285px] lg:w-[100%] lg:h-[256px] h-[194px] w-[273px] mx-auto rounded-[20px] object-contain' />
            </div>

            <div className="details pl-[10px]">
                <div className="head text-[#959595] font-[500] text-[14px] flex justify-start mt-[5px]">
                    {heading}
                </div>
                <div className="name mt-[5.5px] text-black flex justify-start text-[18px] md:text-[22px] lg:text-[22px] font-[700]" style={{
                    letterSpacing: "-0.5px"
                }} >
                    {name}
                </div>
                <div className="moreDesc w-[100%] flex lg:gap-[18px] gap-[10px]" style={{ letterSpacing: "-0.5px" }}>
                    <div className="w-[136px]">
                        <div className="head text-[#959595] font-[500] text-[12px] flex justify-start">
                            Lease&nbsp;term:&nbsp;<span className='text-black ml-1 '>{lease}</span>
                        </div>
                    </div>
                    <div className="">
                        <div className="head text-[#959595] font-[500] text-[12px] flex justify-start">
                            Miles per year:  <span className='text-black ml-1 '>{mile}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="price flex justify-start mt-[10px] gap-[10px] items-end pl-[10px]" style={{
                letterSpacing: "-0.5px"
            }}>
                <div className="digit text-[30px] font-[700]">
                    {price}$
                </div>
                <div className="text-[12px] font-[500]">/month</div>
            </div>

            <Link to={'/detail/1'}>
                <div className="px-[10px]">
                    <button className='mainButton hover:bg-[#F6B000] lg:w-[100%] md:w-[340px] w-[277px] h-[44px] rounded-[10px] bg-black text-white flex justify-center items-center text-[14px] mt-[15px] font-[500] transition-all duration-300'>
                        Request a quote
                    </button>
                </div>
            </Link>
            <Link to={`/view/${id}`}>
                <div className="">
                    <button className='lg:w-[100%] md:w-[340px] w-[277px] h-[44px] rounded-[10px] flex justify-center items-center text-[14px] mt-[10px] hoverAni56 font-[500] relative'
                        onMouseEnter={() => setHovered(true)} // Set hover state to true
                        onMouseLeave={() => setHovered(false)}
                    >
                        View Details
                        <div className="line">
                            
                        </div>
                        <span className='w-[20px]'>
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
                                    stroke={`${!hovered ? "#000000" : "#FFB600"}`}
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </Link>
        </motion.div>
    )
}

const CardContainer = ({ blogPosts, isSearch = false }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [visiblePosts, setVisiblePosts] = useState([]);

    const filterCards = (cards) => {
        // Apply filtering logic here, e.g.:
        return cards.filter(card => card.price > 500); // Example filter: only show cards with price > 500
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        setVisiblePosts(filterCards(blogPosts));

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [blogPosts, isSearch]);

    return (
        <div className="flex flex-wrap -mt-5  w-full gap-[0.3%]">
            <AnimatePresence>
                {visiblePosts.map((post) => (
                    <Card key={post.id} obj={post} />  // Use a unique key for each post
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CardContainer;
