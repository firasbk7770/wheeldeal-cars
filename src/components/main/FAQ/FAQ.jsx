import React from 'react'

import Section from './Section1'
import { Link } from 'react-router-dom'

const FAQ = () => {
    return (
        <div className="lg:w-full md:w-full w-[350px]">
            <div className=" container">
                <div className='lg:mx-auto md:mx-auto mt-[10%]  w-[100%] flex justify-between min-h-[349px] flex-wrap '>
                    <div className="flex flex-col justify-start items-start lg:ml-0 md:ml-0 ">
                        <div className="heading font-[700] lg:text-[45px] md:text-[45px] text-[35px] lg:w-[401px] md:w-[401px]  text-black text-start font-700">
                            Frequently Asked Questions
                        </div>
                        <div className="lg:w-[505px] md:w-[505px] w-[325px] font-[500] lg:text-[16px] md:text-[16px] text-[13px] text-[#959595] flex justify-start mt-[21px]">
                            If you have more questions, please contact us
                        </div>
                        <Link to={'/blog'}>
                            <div className="lg:block md:block hidden">
                                <button className='min-w-[162px]  bg-black flex justify-center items-center rounded-[10px] text-[16px] text-white font-[500] p-[22px, 18px, 18px, 18px] mt-10 p-5 button21'>
                                    Get free consultation
                                    <span className='flex  transition-all duration-300 ' >
                                        <img src={require("../../../images/whitefullarrow.png")} className='w-[0px]  h-[0px]' alt="" />
                                    </span>
                                </button>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[600px]">
                        <Section />
                    </div>
                    {/* <Link to={'/blog'}>
                        <div className="lg:hidden md:hidden block my-5  mb-[100px] mt-[25px]">
                            <button className='min-w-[325px]  bg-black flex justify-center items-center rounded-[10px] text-[16px] text-white font-[500] mt-10 p-5 button21'>
                                <div className="">
                                    Get free consultation
                                </div>
                                <span className='flex  transition-all duration-300 ml-0' >
                                    <img src={require("../../../images/whitefullarrow.png")} className='w-[0px]  h-[0px]' alt="" />
                                </span>
                            </button>
                        </div>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default FAQ
