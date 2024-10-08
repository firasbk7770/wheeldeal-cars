import React, { useState } from 'react';
import Modal from './Modal';

const Row = ({ data, onDelete }) => {
    const { vehicleType, name, monthly_payment, cylinder, photos, brand, id } = data;
    const [isEdit, setIsEdit] = useState(false); // State to handle modal visibility
    const [deleteModel, SetDeleteModel] = useState(false); // State to handle modal visibility

    const openEditModal = () => {
        setIsEdit(true);
    };

    const closeEditModal = () => {
        setIsEdit(false);
    };

    const deleteModal = () => {
        SetDeleteModel(false);
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/car/private/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete the car');
            }

            // Call the onDelete callback to remove the car from the list
            if (onDelete) {
                onDelete(id); // Optionally pass the deleted car id to the parent component
            }

            // You may also want to handle success feedback here
            // alert('Car deleted successfully!');
        } catch (error) {
            console.error('Error deleting car:', error);
            alert('Error deleting car. Please try again.');
        }
    };

    return (
        <div className='h-[60px] flex items-center justify-between px-5' style={{ borderBottom: "1px solid #E9E9E9" }}>
            <div className="flex max-w-[22%] w-[22%] gap-3 items-center text-[14px] font-[500] text-[#636363]">
                <img src={photos[0]} alt="" className='w-[38px] h-[38px] rounded object-contain' />
                <div>{name}</div>
            </div>

            <div className="flex max-w-[18%] w-[18%] gap-3 items-center text-[14px] font-[500] text-[#000]">
                <div>{brand}</div>
            </div>

            <div className="flex max-w-[18%] w-[18%] gap-3 items-center text-[14px] font-[500] text-[#000]">
                <div>I-{cylinder} cyl</div>
            </div>

            <div className="flex max-w-[14%] w-[18%] gap-3 items-center text-[14px] font-[500] text-[#000]">
                <div>${monthly_payment}</div>
            </div>

            <div className="flex max-w-[18%] w-[18%] gap-3 items-center text-[14px] font-[500] text-[#000]">
                <div>{vehicleType}</div>
            </div>

            {/* Icons with hover effect */}
            <div className="flex max-w-[18%] w-[5%] gap-5 items-center">
                {/* Edit Icon */}
                <div
                    className="hover:text-[#FFB600] text-[#767676] cursor-pointer"
                    onClick={openEditModal} // Open modal on click
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2496 6.19035L14.7851 9.72591L6.53553 17.9755H3V14.4399L11.2496 6.19035ZM12.4281 5.01184L14.1958 3.24408C14.5213 2.91864 15.0489 2.91864 15.3743 3.24408L17.7314 5.6011C18.0568 5.92653 18.0568 6.45417 17.7314 6.77961L15.9636 8.54737L12.4281 5.01184Z" fill="currentColor" />
                    </svg>
                </div>

                {/* Delete Icon */}
                <div className="hover:text-red-500 text-[#767676] cursor-pointer" onClick={()=> SetDeleteModel(true)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.167 4.99935H18.3337V6.66602H16.667V17.4993C16.667 17.9596 16.2939 18.3327 15.8337 18.3327H4.16699C3.70676 18.3327 3.33366 17.9596 3.33366 17.4993V6.66602H1.66699V4.99935H5.83366V2.49935C5.83366 2.03912 6.20676 1.66602 6.66699 1.66602H13.3337C13.7939 1.66602 14.167 2.03912 14.167 2.49935V4.99935ZM7.50033 9.16602V14.166H9.16699V9.16602H7.50033ZM10.8337 9.16602V14.166H12.5003V9.16602H10.8337ZM7.50033 3.33268V4.99935H12.5003V3.33268H7.50033Z" fill="currentColor" />
                    </svg>
                </div>
            </div>

            {/* Modal Component */}
            {isEdit && <Modal closeModal={closeEditModal} carId={id} name={name} />}




            {deleteModel && <div className='w-[100vw] h-[100vh] flex fixed justify-center items-center top-0 left-0' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="w-[400px] flex flex-wrap rounded-[15px] h-[400px] max-h-[400px] bg-white px-10 overflow-y-auto overflow-x-hidden justify-center items-center">
                    <div className="flex flex-col items-center justify-between h-[350px] pt-14 relative">
                        <img src={require("../../images/Vector.png")} className='absolute top-[10px] right-[10px] cursor-pointer' onClick={() => { deleteModal(); }} alt="" />
                        <div className=" flex flex-col items-center">
                            <div className="font-[700] text-[30px] mt-10">
                                Delete Vehicle?
                            </div>
                            <div className="mt-[25px] w-[263px] text-[14px] text-[#959595] font-[500] text-center">
                            Are you sure you want to delete a vehicle? Once you delete it, you won't be able to restore it.
                            </div>
                        </div>
                        <div className="w-[352px] flex gap-3">
                            <div className="w-[50%] h-[50px]  justify-center items-center flex rounded-[10px] cursor-pointer" onClick={() => { deleteModal(); }}>
                                <div className="text-[16px] font-[500]" >
                                    Cancel
                                </div>
                            </div>
                            <div className="w-[50%] h-[50px]  bg-black text-white justify-center items-center flex rounded-[10px] cursor-pointer" onClick={() => { handleDelete(); deleteModal() }}>
                                <div className="text-[16px] font-[500] " >
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            }
        </div>
    );
};

export default Row;
