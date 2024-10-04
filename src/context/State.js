import { useEffect, useState } from "react";
import { context as Context } from "./context";


const StatesStore = ({ children }) => {
    const [carData, setCarData] = useState([]);

    const [isFilter, setIsFilter] = useState(false);

    const [selectedValues, setSelectedValues] = useState({
        Make: [],  // "All" is selected by default for "Make"
        Categories: [],
        Model: [],
        BodyType: [],
        Price: []
    });

    const [activeSort, setActiveSort] = useState({ name: "Oldest to Newest", value: "OTN" });


    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    const [viewPage, setViewPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [isFilter, viewPage, activeSort])

    const fetchData = async () => {
        try {
            const queryParams = new URLSearchParams();

            if (!selectedValues.Make.includes('All')) {
                queryParams.append('brand', selectedValues.Make);
            }
            queryParams.append('page', viewPage)

            if (selectedValues.Categories.length > 0) {
                queryParams.append('categories', selectedValues.Categories.join(','));
            }

            if (selectedValues.BodyType.length > 0) {
                queryParams.append('vehicleType', selectedValues.BodyType);
            }

            // Add "Model" filter (if any models are selected)
            if (selectedValues.Model.length > 0) {
                queryParams.append('model', selectedValues.Model);
            }

            if (selectedValues.Make.length > 0) {
                queryParams.append('brand', selectedValues.Make);
            }

            if (activeSort) {
                queryParams.append('sort', activeSort.value);
            }

            // Add "Price" filter (if price range is defined)
            if (priceRange.min !== 0 || priceRange.max !== 100) {
                queryParams.append('minPrice', priceRange.min);
                queryParams.append('maxPrice', priceRange.max);
            }

            console.log(selectedValues);
            // Fetch the data with the applied filters
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/car/public?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCarData(data.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const fetchDataAdmin = async () => {
        try {
            const queryParams = new URLSearchParams();


            queryParams.append('page', viewPage)

            if (selectedValues.Categories.length > 0) {
                queryParams.append('categories', selectedValues.Categories.join(','));
            }


            // Fetch the data with the applied filters
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/car/public?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setCarData(data.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    return (
        <Context.Provider value={{ isFilter, setIsFilter, carData, setCarData, priceRange, setPriceRange,  selectedValues, setSelectedValues, activeSort, setActiveSort, fetchData, viewPage, setViewPage, fetchDataAdmin }} >
            {children}
        </Context.Provider>
    )
}

export default StatesStore