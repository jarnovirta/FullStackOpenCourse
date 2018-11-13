import React from 'react'
import FilterCountries from './components/FilterCountries'
import CountryView from './components/CountryView'
import countryService from './services/countries'


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filterString: '',
        
      }
    }
    componentDidMount() {
        countryService.getAll().then(countries => {
            this.setState((prevState) => { return {...prevState, countries:countries}})
        })
    }
    handleCountrySelection = (country) => { return () => {
        this.setFilterString(country)
        }
    }
    setFilterString = (filterString) => this.setState((prevState) => 
        { return {...prevState, filterString:filterString}})

    handleSearchInput = (event) => { 
        this.setFilterString(event.target.value)
    }
    render() {
      return (
        <div>
            <FilterCountries filterString={this.state.filterString} 
                searchInputHandler={this.handleSearchInput} />
            <CountryView countries={this.state.countries}
                filterString={this.state.filterString}
                handleCountrySelection={this.handleCountrySelection} />
        </div>
      )
    }
  }
  
  export default App