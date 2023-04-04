import React, { useState, useEffect, createContext} from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type(any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, Loading] = useState(false);

  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicate countries
    const uniqueCountries = ['Location (any)',...
    new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
    
  }, []);

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicate properties
    const uniqueProperties = ['Location (any)',...
    new Set(allProperties)];

    // set properties state
    setProperties(uniqueProperties);
    
  }, []);


  const handleClick = () => {
    // function that checks if the string includes (any)
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(' ')[0]);

    // get second value of price which is the maximum price and parse it to number
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouse = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if(
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      )
      {
        return house;
      }
    });
    return newHouse;
  };

  return <HouseContext.Provider 
    value={{
      country,
      setCountry,
      countries,
      property,
      setProperty,
      setProperties,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick
    }}>
    {children}
  </HouseContext.Provider>
};

export default HouseContextProvider;