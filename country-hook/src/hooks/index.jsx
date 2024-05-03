import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
 export const useCountry = (name) => {
    console.log(name)
    const [country, setCountry] = useState(null)
    const url =  `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    useEffect(() => {
      axios
        .get(url)
        .then((res) => {
          console.log('response.data ', res.data)
          setCountry(res.data);
        })
        .catch((err) => {console.log(err); setCountry('')});
    }, [name]);

    console.log('country', country)
    return country 
  }