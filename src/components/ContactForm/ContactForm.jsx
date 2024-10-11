import React, { useState } from 'react';

const ContactForm = () => {
    const [step, setStep] = useState(1);

    // Proceed to the next step
    const nextStep = () => {
        if (step < 5) {  // Now there are 5 steps
            setStep(step + 1);
        }
    };

    // Go back to the previous step
    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    // Submit form (handle form submission)
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    // Render different step contents
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Info />;
            case 3:
                return <Address />;
            case 4:
                return <Employment />;
            case 2:
                return <Identity />;
            case 5:
                return <Address />;  // New Business step
            case 6:
                return <Business />;  // New Business step
            case 7:
                return <Address />;  // New Business step
            default:
                return <Info />;
        }
    };

    return (
        <div className="flex lg:flex-nowrap flex-wrap justify-between items-center">
            {/* Form container */}
            <div className=" flex justify-center items-start flex-col lg:w-[40%] w-full">
                <div className="lg:text-[45px] text-[32px] font-[700] mb-5">
                    Explore Your Financing Options
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-steps flex-wrap mb-10">
                        <span className={step >= 1 ? (step === 1 ? 'active' : 'completed') : ''} style={{ padding: 0, cursor: "pointer" }} onClick={() => setStep(1)}>Info</span> &gt;
                        <span className={step >= 2 ? (step === 4 ? 'active' : 'completed') : ''}onClick={() => setStep(2)} style={{cursor: "pointer"}}>Identity</span> &gt;
                        <span className={step >= 3 ? (step === 2 ? 'active' : 'completed') : ''}onClick={() => setStep(3)} style={{cursor: "pointer"}}>Address</span> &gt;
                        <span className={step >= 4 ? (step === 3 ? 'active' : 'completed') : ''} onClick={() => setStep(4)} style={{cursor: "pointer"}}>Employment</span> &gt;
                        
                        <span className={step >= 5 ? (step === 5 ? 'active' : 'completed') : ''}onClick={() => setStep(5)} style={{cursor: "pointer"}}>Employment Address</span> &gt;
                        <span className={step >= 6 ? (step === 5 ? 'active' : 'completed') : ''}onClick={() => setStep(6)} style={{cursor: "pointer"}}>Business</span> &gt;
                        <span className={step >= 7 ? (step === 5 ? 'active' : 'completed') : ''}onClick={() => setStep(7)} style={{cursor: "pointer"}}>Business Adress</span>
                    </div>
                    <div className="form-content">{renderStep()}</div>
                    <div>
                        {step < 7 && <button
                            className='submitButton lg:w-[510px] md:w-[510px] w-[325px] h-[56px] flex justify-center items-center text-[16px] font-[500] mt-[30.4px] bg-black text-white rounded-[10px] hover:bg-brand-main transition-all duration-300 hover:text-white gap-3 relative'
                            type='button'
                            onClick={nextStep}
                        >
                            Next
                        </button>}
                        {step === 7 && <button
                            className='submitButton lg:w-[510px] md:w-[510px] w-[325px] h-[56px] flex justify-center items-center text-[16px] font-[500] mt-[30.4px] bg-black text-white rounded-[10px] hover:bg-brand-main transition-all duration-300 hover:text-white gap-3 relative'
                            type='submit'
                        >
                            Submit
                        </button>}
                    </div>
                </form>
            </div>

            <div className="lg:w-[610px] lg:block hidden w-full  mt-6 lg:mt-0">
                <img className="lg:w-[610px]  w-[375px] lg:h-[552px] h-[243.75px] rounded-[15px] mx-auto" src={require('../../../src/images/car contact us.png')} alt="" />
            </div>
        </div>
    );
};

// Step Components
const Info = () => (
    <div className='lg:w-[505px]  lg:mt-0 md:mt-0 mt-10'>
        <div className="row1 flex gap-[20px]">
            <div className="">
                <input type="text" className='lg:w-[244.94px] md:w-[244.94px] w-[157px] h-[54px] border-b outline-none text-[16px] font-[500] ' placeholder='First name' />
            </div>
            <div className="">
                <input type="text" className='lg:w-[244.94px] md:w-[244.94px] w-[152px] h-[54px] border-b outline-none text-[16px] font-[500] ' placeholder='Last name' />
            </div>
        </div>
        <div className="mt-8">
            <input type="email" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500] ' placeholder='Email' />
        </div>
        <div className="mt-8">
            <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500] ' placeholder='M. I' />
        </div>
        <div className="mt-8">
            <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500] ' placeholder='Phone Number' />
        </div>
        
    </div>
);

const Address = () => (
    <div>
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Street Address' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='City' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='State' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Zip Code' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Country' />
    </div>
);

const Employment = () => (
    <div>
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Employer' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Job Title' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Occupation' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Annual Income' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Years at Employer' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Emp ph.' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Place of Employment' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Employment Address' />
    </div>
);

const Identity = () => (
    <div>
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='SSN' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Drivers License' />
        <input type="date" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Date of Birth' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Nationality' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Own/Rent/Mortgage Amount' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Home Address' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Previous Address' />
    </div>
);

// New Business Step Component
const Business = () => (
    <div>
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Business Name' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Business Type' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Federal Tax ID' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Years Established' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Phone Number' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Email' />
        <input type="text" className='lg:w-[510px] md:w-[510px] w-[324px] h-[54px] border-b outline-none text-[16px] font-[500]' placeholder='Relation with Business' />
    </div>
);

export default ContactForm;
