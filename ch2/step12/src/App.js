import axios from "axios";
import React, { useState, useEffect } from "react";

const  App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    //console.log(e.target.value)
    setSearch(e.target.value)
  }

  const filterCountries = (sbstr) => {
    return countries.filter(c => c.name.toLowerCase().includes(sbstr.toLowerCase()))
  }

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(resp => {
        const data = resp.data
        //console.log(data)
        setCountries(data)
      })

  }, [])

  
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}></input>
      <h3>Countries:</h3>
      <FilterOutput fArray={filterCountries(search)} />
    </div>
  );
}

const CountryView = ({ country }) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lo => <li key={lo.name}>{lo.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name + " flag"}></img>
    </div>
  )
}


const FilterOutput = ({fArray}) => {
  let out = {}
  if (fArray.length > 10) {
    out = <p>Too many matches, specify another filter</p>
  } else if (fArray.length === 1) {
    out = <CountryView country={fArray[0]} />
  } else {
    out = fArray.map(c => <p key={c.name}>{c.name}</p>);
  }
  return (
    <div>
     {out}
    </div>
  )
}

export default App;


