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

  },[])

  
  return (
    <div>
      find countries <input value={search} onChange={handleSearch}></input>
      <h3>Countries:</h3>
      <FilterOutput fArray={filterCountries(search)} />
    </div>
  );
}

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState({}) 

  const api_key = process.env.REACT_APP_API_KEY  
  
  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(resp => {
      const data = resp.data
      console.log(data.current)
      setWeather(data.current)
    }).catch(error => console.error(error))

  },[api_key, country])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lo => <li key={lo.name}>{lo.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name + " flag"} width="300px" height="200px"></img>
      <h2>Weather in {country.capital}</h2>
      {weather.temperature && <WeatherView weather={weather}/>}
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
    out = <CountryListView fArray={fArray} />           
  }
  return (
    <div>
     {out}
    </div>
  )
}

const WeatherView = ({weather}) => {

  return (      
      <div>
        <p><strong>temperature: </strong>{weather.temperature} Celsius</p>
        <img src={weather.weather_icons[0]} alt="weather icon"></img>
        <p><strong>wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}</p>
      </div> 
  )
}

const CountryListView = ({fArray}) => {
  const [countList, setCountList] = useState(fArray)

  const handleClick = (e) => {
    console.log(e.target.name)
    const country = countList.filter(c => c.name === e.target.name)
    setCountList(country)
  }

  let out = countList.map(c => <p key={c.name}>{c.name}<button key={c.name} name={c.name} onClick={handleClick}>show</button></p>);
  if (countList.length === 1) {
    out = <CountryView country={countList[0]} />
  }
  return (
    <div>
     {out}
    </div>
  )
}

export default App;


