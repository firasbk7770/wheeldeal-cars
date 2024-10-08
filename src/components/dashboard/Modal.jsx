import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { img } from 'framer-motion/client';


const Modal = ({ closeModal, heading = "Add new vehicle", carId = null, name }) => {
    // States for each field
    const [carName, setCarName] = useState(carId ? name : '');
    const [category, setCategory] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [leaseTerm, setLeaseTerm] = useState('');
    const [milesPerYear, setMilesPerYear] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [numSeats, setNumSeats] = useState('');
    const [transmission, setTransmission] = useState('');
    const [numCylinders, setNumCylinders] = useState('');
    const [images, setImages] = useState([]);
    const [vehicleType, setVehicleType] = useState('');
    // const [description, setDescription] = useState('');

    // Fetch car details if carId is present (edit mode)
    useEffect(() => {
        if (carId) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/car/public/${carId}`)  // Replace with your actual API endpoint
                .then(response => response.json())
                .then(data => {
                    setCarName(data?.data?.carName);
                    setCategory(data?.data.category);
                    setModel(data?.data.model);
                    setBrand(data?.data.brand);
                    setLeaseTerm(data?.data.leaseTerm);
                    setMilesPerYear(data?.data.miles);
                    setMonthlyPayment(data?.data.monthly_payment);
                    setNumSeats(data?.data.seats);
                    setTransmission(data?.data.transType);
                    setNumCylinders(data?.data.cylinder);
                    setVehicleType(data?.data.vehicleType)
                    setImages(data?.data.photos)
                    // Add logic for setting existing images if needed
                })
                .catch(err => console.error(err));
        }
    }, [carId]);

    const [step, setStep] = useState(1);

    // Handle file uploads (image files)
    const handleFileChange = async (e) => {

        const cloudinaryUploadURL = 'https://api.cloudinary.com/v1_1/dbzjzgav7/image/upload';
        const uploadPreset = 'wheeldeals';
        const selectedFiles = e.target.files[0];

        const formData = new FormData();
        formData.append('file', selectedFiles);
        formData.append('upload_preset', uploadPreset);


        try {
            // Upload image to Cloudinary
            const response = await fetch(cloudinaryUploadURL, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data.secure_url);
            if (data.secure_url) {

                setImages([...images, data.secure_url]);
            } else {
                alert('Error uploading image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
        // const base64Images = [];

        // for (let i = 0; i < selectedFiles.length; i++) {
        //     const file = selectedFiles[i];
        //     const base64 = await toBase64(file); // Convert file to Base64

        //     // Check if the base64 string already has the correct prefix, if not, add it
        //     if (!base64.startsWith("data:image/")) {
        //         const fileType = file.type; // get the file type (e.g., image/png)
        //         base64Images.push(`data:${fileType};base64,${base64}`);
        //     } else {
        //         base64Images.push(base64); // Already formatted correctly
        //     }
        // }
        e.target.value = ''; 
        // setImages([...images, ...base64Images]);
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Ensure we read as Data URL to include the MIME type
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        // setCarName(name + " ")
        setMilesPerYear(milesPerYear + " ")
    }, [])

    // Handle form submission
    const saveCar = () => {
        const sanitizedMonthlyPayment = String(monthlyPayment || "").trim();
        setCarName(carName + "     ");
        const carData = {
            name: String(carName || '').trim(),
            category: String(category || '').trim(),
            model: String(model || '').trim(),
            brand: String(brand || '').trim(),
            leaseTerm: String(leaseTerm || '').trim(),
            miles: String(milesPerYear || '').trim(),
            monthly_payment: sanitizedMonthlyPayment,

            seats: String(numSeats || '').trim(),
            transType: String(transmission || '').trim(),
            cylinder: String(numCylinders || '').trim(),
            vehicleType: String(vehicleType || '').trim(),
            photos: images,
        };


        const url = carId ? `${process.env.REACT_APP_BACKEND_URL}/car/private/${carId}` : `${process.env.REACT_APP_BACKEND_URL}/car/private`;
        const method = carId ? 'POST' : 'POST';

        fetch(url, {
            method: method,
            body: JSON.stringify(carData),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.ok) {
                    // closeModal();
                    setStep(4);
                } else {
                    console.error('Failed to save car');
                    alert("Every error is not bad but this error is bad");
                }
            })
            .catch(err => console.error('Error:', err));
    };

    useEffect(() => {
        // console.log("Images are", images);
    }, [images])

    return (
        <div className='w-[100vw] h-[100vh] flex fixed justify-center items-center top-0 left-0' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            {/* {model 1 here use name and description and set them} */}.
            <div className="w-[690px] " style={{ display: step === 4 ? "none" : "block" }}>
                {step === 1 && <div className="w-[690px] flex flex-wrap rounded-[15px] h-[95vh] max-h-[778px] bg-white px-10 overflow-y-auto overflow-x-hidden">
                    <div className="">

                        <div className="head flex text-[16px] text-[#767676] w-[650px]  font-[500]  mt-[36px]">
                            <div className="">
                                {carId ? "Edit vehicle" : "Add new vehicle"}
                            </div>
                            <div className="ml-[30px] text-[500] text-[#B9B9B9]">
                                Step 1/3
                            </div>
                        </div>

                        <div className="head text-[30px] font-[700] text-black mt-[36px]">
                            {carId ? "Car Name" : "Add car name"}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between flex-wrap pt-4 gap-3 h-[80%]">
                        <div className="">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Name
                            </div>
                            <input type='text' placeholder='Enter car name' className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[600px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" value={carName} onChange={(e) => setCarName(e.target.value)} />
                        </div>

                        <div className="w-[600px] mt-5 flex justify-end gap-5 font-[500] pb-[30px]">
                            <button className="" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="bg-black text-white px-8 py-4 rounded-[15px]" onClick={() => { setStep(2); setCarName(carName + ' ') }}>
                                Next
                            </button>
                        </div>
                    </div>

                </div>}
                {step === 2 && <div className="w-[690px]  flex-wrap rounded-[15px] h-[95vh] max-h-[778px] bg-white px-10 overflow-y-auto overflow-x-hidden vehicleModal">
                    <div className="head flex text-[16px] text-[#767676] w-[650px]  font-[500]  mt-[36px]">
                        <div className="">
                            {carId ? "Edit vehicle" : "Add new vehicle"}
                        </div>
                        <div className="ml-[30px] text-[500] text-[#B9B9B9]">
                            Step 2/3
                        </div>
                    </div>

                    <div className="head text-[30px] font-[700] text-black mt-[36px]">
                        Vehicle details
                    </div>
                    <div className="flex flex-wrap pt-4 gap-3">

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Choose Category
                            </div>

                            <div className="">
                                <Dropdown options={['Sport', 'SUVs ', 'Hatchback', 'Crossover', 'Sedan', 'Electric', 'Hybrid', 'Pickup']} optionCase={carId ? "edit" : "add"} label={category || 'Sport'} onSelect={setCategory} />
                            </div>
                        </div>

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Vehicle Model
                            </div>

                            <div className="">
                                <Dropdown options={['Model Y', 'Model S ', 'Cybertruck']} label={model || 'Model Y'} optionCase={carId ? "edit" : "add"} onSelect={setModel} />
                            </div>
                        </div>

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Vehicle Type
                            </div>

                            <div className="">
                                <Dropdown options={['Sedan', 'Cargo Van', 'Convertible ', 'Hatchback', 'Mnivan', 'Passenger Van', 'SUV', 'Truck', 'Wagon']} optionCase={carId ? "edit" : "add"} label={vehicleType || 'Choose Vehicle Type'} onSelect={setVehicleType} />
                            </div>
                        </div>

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Vehicle Brand
                            </div>

                            <div className="">
                                <Dropdown options={['Toyota', 'Kia', 'Tesla ', 'Acura', 'Porshe', 'Volkswagen', 'Opel', 'Mazda', 'BMW']} optionCase={carId ? "edit" : "add"} label={brand || 'Toyota'} onSelect={setBrand} />
                            </div>
                        </div>

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Lease Term
                            </div>

                            <div className="">
                                <Dropdown options={['12 months', '24 months ', '36 months']} optionCase={carId ? "edit" : "add"} label={leaseTerm || 'Choose Lease Term'} onSelect={setLeaseTerm} />
                            </div>
                        </div>

                        <div className="">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Miles per year
                            </div>

                            <input type='text' placeholder='10,000 miles/year' className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[284px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" value={milesPerYear} onChange={(e) => setMilesPerYear(e.target.value)} />


                        </div>


                        <div className="">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Monthly Payment
                            </div>

                            <input type='text' placeholder='1080' className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[284px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
                        </div>


                        <div className="">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Number of Seats
                            </div>

                            <input type='text' placeholder='5' className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[284px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" value={numSeats} onChange={(e) => setNumSeats(e.target.value)} />


                        </div>

                        <div className="w-[284px]">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Transmission type
                            </div>

                            <div className="">
                                <Dropdown options={['Automatic', 'Manual transmission']} optionCase={carId ? "edit" : "add"} label={transmission || 'Select transmission type'} onSelect={setTransmission} />
                            </div>
                        </div>

                        <div className="">
                            <div className="text-[#767676] text-[12px] font-[500]">
                                Number of Cylinders
                            </div>

                            <input type='text' placeholder='3' className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[284px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" value={numCylinders} onChange={(e) => setNumCylinders(e.target.value)} />

                        </div>
                    </div>


                    <div className="w-[600px] flex justify-between font-[500] pb-[30px] items-center">
                        <button className="mt-10 flex gap-1 justify-center items-center" onClick={() => setStep(step - 1)}>
                            <img src={require("../../images/back.png")} alt="" />
                            Back
                        </button>
                        <div className=" mt-10 flex justify-end gap-5 ">
                            <button className="" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="bg-black text-white px-8 py-4 rounded-[15px]" onClick={() => setStep(3)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>}
                {step === 3 && <div className="w-[690px] flex flex-wrap rounded-[15px] h-[95vh] max-h-[778px] bg-white px-10 overflow-y-auto overflow-x-hidden">
                    <div className="">

                        <div className="head flex text-[16px] text-[#767676] w-[650px]  font-[500]  mt-[36px]">
                            <div className="">
                                {carId ? "Edit vehicle" : "Add new vehicle"}
                            </div>
                            <div className="ml-[30px] text-[500] text-[#B9B9B9]">
                                Step 3/3
                            </div>
                        </div>

                        <div className="head text-[30px] font-[700] text-black mt-[36px]">
                            {"Add photos"}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between flex-wrap pt-4 gap-3 h-[80%]">
                        <div className="">

                            <div className="text-[12px] font-[400] flex gap-3 text-[#4E4E4E]">
                                <img src={require("../../images/info.png")} alt="" />
                                <div className="">
                                    Upload up to 10 images of any damages or the vehicle condition upon return
                                </div>
                            </div>

                            <div className="w-[80px] mt-10"></div>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="bg-lightgray mt-3 text-[16px] font-[500] px-7 py-4 rounded-[10px] cursor-pointer hidden"
                                id='photoSelector'
                            />
                            <div className="w-[10px]"></div>


                            <label htmlFor='photoSelector' className="bg-lightgray mt-3 text-[16px] font-[500] px-7 py-4 rounded-[10px] cursor-pointer">
                                Browse files
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {images.map((image, index) => (
                                    <div key={index} className="mt-10 relative w-[138px] h-[136px] mx-1 my-auto">
                                        <img
                                            src={image}
                                            alt="Uploaded Image1"
                                            className="w-full h-full rounded-xl object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevents infinite loop if image keeps failing
                                                e.target.src = 'fallback-image-url'; // Set a fallback image if needed
                                                console.error('Image failed to load:', image);
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                const updatedImages = images.filter((_, i) => i !== index); // Remove image
                                                setImages(updatedImages);
                                            }}
                                            className="absolute top-[-5px] right-[-5px] w-4 h-4 text-white bg-black rounded-full flex justify-center items-center text-[14px]"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="w-[600px] flex justify-between font-[500] pb-[30px] items-center">
                            <button className="mt-10 flex gap-1 justify-center items-center" onClick={() => setStep(step - 1)}>
                                <img src={require("../../images/back.png")} alt="" />
                                Back
                            </button>
                            <div className=" mt-10 flex justify-end gap-5 ">
                                <button className="" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="bg-black text-white px-8 py-4 rounded-[15px]" onClick={() => saveCar()}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                </div>}


            </div>

            {step === 4 && <div className="w-[400px] flex flex-wrap rounded-[15px] h-[400px] max-h-[400px] bg-white px-10 overflow-y-auto overflow-x-hidden justify-center items-center">
                <div className="flex flex-col items-center justify-between h-[350px] pt-14 relative">
                    <img src={require("../../images/Vector.png")} className='absolute top-[10px] right-[10px] cursor-pointer' onClick={()=>{closeModal(); window.location.reload()}} alt="" />
                    <div className=" flex flex-col items-center">
                        <div className="">
                            <img src={require("../../images/Group 33543.png")} alt="" />
                        </div>
                        <div className="font-[700] text-[30px]">
                            Success!
                        </div>
                        <div className="mt-[25px] text-[14px] text-[#959595] font-[500] text-center">
                            Vehicle is successfully {carId ? "edited" : "added"}
                        </div>
                    </div>
                    <div className="w-[352px] h-[50px]  bg-black text-white justify-center items-center flex rounded-[10px] cursor-pointer" onClick={()=>{closeModal(); window.location.reload()}}>
                        <div className="text-[16px] font-[500]" >
                            Back to Dashboard
                        </div>
                    </div>
                </div>


            </div>}


        </div>
    )
}

export default Modal
