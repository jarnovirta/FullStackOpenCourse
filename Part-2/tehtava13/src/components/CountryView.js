import React from 'react'

const CountryDetail = ({country}) => {
    return (<div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} alt="Flag of {country.name}" className="flag"/>
    </div>)
}
const CountryView = ({countries, filterString, setSearchString}) => {
    const selectCountry = (country) => { return () => setSearchString(country.name)}
    const filteredCountries = countries.filter(country => 
                (filterString === '' 
                || country.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1)
                )
     if (filteredCountries.length === 1) {
        return <div><CountryDetail country = {filteredCountries[0]} /></div>
    }
    else return (
        <div>
            { filteredCountries.map(country => 
                <p onClick={selectCountry(country)} key={country.name}>{country.name}</p>) }
        </div>
    )
}
export default CountryView