import React, { useState, useEffect } from 'react';
// import Card from '../General/Card';




const Card = ({ obj }) => {
    const { image, discount, seats, heading, name, lease, mile, price } = obj;
    return (
        <div className='mainCard lg:w-[31.5%] md:w-[400px] w-[320px] lg:h-[580px] md:h-[580px] h-[490px] p-[18px] rounded-[15px] border border-[#E9E9E9] my-10 bg-white cursor-pointer md:mr-[20px] mr-[0px]' >
            <div className="cardNav text-[#959595] font-[500] text-[12px] flex justify-between items-center">
                <div className=" w-[70px] h-[35px] p-[8px, 10px, 6px, 10px] bg-[#FFE39E] text-[17px] font-[700] text-black rounded-[8px] flex justify-center items-center">
                    {discount}
                </div>
                <div className="flex lg:gap-3 md:gap-4 gap-2">
                    <div className=" flex gap-[5px] ">
                        <img src={require('../../images/chair.png')} className='w-[19px] h-[19px]' alt="" />
                        <div className="lg:text-base md:text-base text-[12px]">
                            {seats} seats
                        </div>
                    </div>

                    <div className=" flex gap-[5px] ">
                        <img src={require('../../images/automatic.png')} className='w-[19px] h-[19px]' alt="" />
                        <div className="lg:text-base md:text-base text-[12px]">
                            Automatic
                        </div>
                    </div>
                </div>
            </div>

            <div className="imageSection  relative">
                <div className="lg:w-[28.5%] lg:h-[256px] h-[194px] w-[273px] absolute top-0 left-0" style={{ zIndex: 100 }}></div>
                <img src={image} alt="" className='lg:w-[100%] lg:h-[256px] h-[194px] w-[273px]' style={{ zIndex: -1 }} />
            </div>

            <div className="details">
                <div className="head text-[#959595] font-[500] text-[14px] flex justify-start mt-[5px]">
                    {heading}
                </div>
                <div className="name mt-[5.5px] text-black flex justify-start text-[18px] md:text-[22px] lg:text-[22px] font-[700]" style={{
                    letterSpacing: "-0.5px"
                }} >
                    {name}
                </div>
                <div className="moreDesc w-[280px] flex gap-[18px]"
                    style={{
                        letterSpacing: "-0.5px"
                    }}
                >
                    <div className="w-[136px]">
                        <div className="head text-[#959595] font-[500] text-[12px] flex justify-start">
                            Lease term: <span className='text-black ml-1 '>{lease}</span>
                        </div>
                    </div>
                    <div className="">
                        <div className="head text-[#959595] font-[500] text-[12px] flex justify-start">
                            Miles per year:  <span className='text-black ml-1 '>{mile}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="price flex justify-start mt-[10px] gap-[10px] items-end" style={{
                letterSpacing: "-0.5px"
            }}>
                <div className="digit text-[30px] font-[700]">
                    {price}$
                </div>
                <div className="text-[12px] font-[500]">/month</div>
            </div>

            <div className="">
                <button className='mainButton lg:w-[340px] md:w-[340px] w-[277px] h-[44px] rounded-[10px] bg-black text-white flex justify-center items-center text-[14px] mt-[15px] font-[500]  transition-all duration-300'>
                    Request a quote
                </button>
            </div>

            <div className="">
                <button className='lg:w-[340px] md:w-[340px] w-[277px] h-[44px] rounded-[10px] flex justify-center items-center text-[14px] mt-[10px] hoverAni font-[500] relative'>
                    View Details <div className='relative'> <div className='hoverLine4'></div></div> <img src={require("../../images/cardicon.png")} className='w-[20px] h-[20px] imahe' alt="" />
                </button>
            </div>
        </div>
    )
}


const CardContainer = ({ blogPosts }) => {


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [visiblePosts, setVisiblePosts] = useState(isMobile ? blogPosts.slice(0, 4) : blogPosts.slice(0, 6));

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth < 768;
            setIsMobile(mobileView);
            setVisiblePosts(mobileView ? blogPosts.slice(0, 2) : blogPosts.slice(0, 6));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [blogPosts]);

    return (
        <div className="flex flex-wrap -mt-5 justify-between w-full gap-[5px]">
            {visiblePosts.map((post, index) => (
                <Card
                    key={index}
                    obj={post}
                />
            ))}
        </div>
    );
};

export default CardContainer;
