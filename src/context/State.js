import { useEffect, useState } from "react";
import { context as Context } from "./context";


const StatesStore = ({ children }) => {
    const [carData, setCarData] = useState([]);

    const [isFilter, setIsFilter] = useState(false);
    const [featureIndex, setFeatureIndex] = useState(1);

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

            // if (!selectedValues.Make.includes('All')) {
            //     queryParams.append('brand', selectedValues.Make);
            // }
            queryParams.append('page', viewPage)

            if (selectedValues.Categories.length > 0) {
                queryParams.append('categories', selectedValues.Categories.join(','));
            }

            if (selectedValues.BodyType && selectedValues.BodyType.length > 0) {
                queryParams.append('vehicleType', selectedValues.BodyType);
            }

            // Add "Model" filter (if any models are selected)
            if (selectedValues.Model && selectedValues.Model.length > 0) {
                queryParams.append('model', selectedValues.Model);
            }

            if (selectedValues.Make && selectedValues.Make.length > 0) {
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
            console.log(data.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const fetchDataAdmin = async (category=null, bodyType=null ) => {
        console.log("Heelonsjkdhask")
        try {
            const queryParams = new URLSearchParams();
            console.log("Heelo djkda")

            queryParams.append('page', viewPage)
            queryParams.append('limit', 9999999999989);

            if (category) {
                queryParams.append('categories', category);
            }
            if (bodyType) {
                queryParams.append('vehicleType', bodyType);
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
            return data;

            // setCarData(data.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    const fetchBlogAdmin = async (category=null) => {
        try {
            const queryParams = new URLSearchParams();
            console.log("Heelo djkda")

            queryParams.append('page', viewPage)
            queryParams.append('limit', 9999999999989);

            if (category) {
                queryParams.append('category', category);
            }
            


            // Fetch the data with the applied filters
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blog/public?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;

            // setCarData(data.data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }


    return (
        <Context.Provider value={{ isFilter, setIsFilter, carData, setCarData, priceRange, setPriceRange,  selectedValues, setSelectedValues, activeSort, setActiveSort, fetchData, viewPage, setViewPage, fetchDataAdmin,fetchBlogAdmin, featureIndex, setFeatureIndex }} >
            {children}
        </Context.Provider>
    )
}

export default StatesStore