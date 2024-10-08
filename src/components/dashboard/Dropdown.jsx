import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, label, onSelect, optionCase, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);
    const divRef = useRef(null);
    const [heightStyle, setHeightStyle] = useState('auto');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) onSelect(option); // Call the callback if provided
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (divRef.current) {
          const contentHeight = divRef.current.scrollHeight; // Get the height of the content
          if (contentHeight > 400) {
            setHeightStyle('400px'); // Set height to 400px if content exceeds 400px
          } else {
            setHeightStyle('auto'); // Keep auto height if content is less than 400px
          }
        }
      }, [isOpen]); // Recalculate on children updates

    return (
        <div className="relative inline-block text-left rounded-xl" ref={dropdownRef}>
            <div className="flex items-center justify-between  cursor-pointer bg-[#F8F8F8] w-[284px] h-[50px] rounded-xl px-5 text-[14px] font-[400] mt-4" onClick={toggleDropdown}>
                <span className={`${(selectedOption ||( optionCase && optionCase === "edit")) ? "text-black" : "text-[#767676]"}`}>{selectedOption || label}</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-[20px] shadow-lg overflow-hidden overflow-y-auto" style={{ height: heightStyle }} ref={divRef}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 mt-3 text-gray-700 cursor-pointer  hover:bg-gray-200"
                            onClick={() => handleOptionClick(option)}
                        >
                            {type === 'transmission' ? <>{option} Transmission</> : <>{option}</>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
