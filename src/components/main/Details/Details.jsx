import React, { useEffect, useState } from 'react'
import Card from './Card'
import { div } from 'framer-motion/client'

const Details = () => {

    const [cards, setCards] = useState([
        {
            desc: "At The Wheel Deal Auto Leasing, we are passionate about making your vehicle leasing experience exceptional. With a commitment to customer satisfaction and a dedication to quality, we offer a seamless and straightforward process to get you behind the wheel of your dream car.",
            heading: "Why the WheelDeal?",
            reverse: true,
            desktopImage: require("../../../images/detailcard1.png"),
            mobileImage: require("../../../images/detailcard1-mobile.png"),
            image: null, // to hold the current image
        },
        {
            desc: "Founded on the principles of transparency, integrity, and excellence, The Wheel Deal is a team of automotive enthusiasts and leasing experts. Our mission is to provide a stress-free leasing experience with personalized service tailored to your needs.",
            heading: "Who We Are",
            reverse: false,
            desktopImage: require("../../../images/detailcard2.png"),
            mobileImage: require("../../../images/detailcard2-mobile.png"),
            image: null,
        },
        {
            desc: "Meet the dedicated professionals who make it all happen. From our knowledgeable sales team to our expert leasing advisors, we work together to ensure your experience is smooth and enjoyable.",
            heading: "Our Team",
            reverse: true,
            desktopImage: require("../../../images/detailcard3.png"),
            mobileImage: require("../../../images/detailcard3-mobile.png"),
            image: null,
        },
    ]);

    useEffect(() => {
        const updateImageUrls = () => {
            const isMobile = window.innerWidth <= 768; // Adjust the pixel value as needed
            setCards(prevCards => 
                prevCards.map(card => ({
                    ...card,
                    image: isMobile ? card.mobileImage : card.desktopImage
                }))
            );
        };

        updateImageUrls(); // Call the function on initial render
        window.addEventListener('resize', updateImageUrls); // Update on resize

        return () => {
            window.removeEventListener('resize', updateImageUrls); // Clean up on component unmount
        };
    }, []);
    return (
        <div className="lg:w-full md:w-full w-[350px]">
            <div className="container ">
                <div className=' mt-[10%] md:w-full lg:w-full '>
                    {cards && cards.map((obj) =>
                        <div key={obj.heading} className='mt-28'><Card heading={obj.heading} reverse={obj.reverse} desc={obj.desc} image={obj.image} /></div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details
