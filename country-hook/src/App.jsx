import React, { useState, useEffect } from "react";
import { useField } from "./hooks";
import { useCountry } from "./hooks";

const Country = ({ country, name }) => {
  console.log(country);

  if (!country) {
    if (!name) {
      return null;
    } else {
      return <div>not found...</div>;
    }
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} name={name} />
    </div>
  );
};

export default App;
