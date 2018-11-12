import React from 'react'
import FilterCountries from './components/FilterCountries'
import CountryView from './components/CountryView'
import countryService from './services/countries'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filterString: ''
      }
    }
    componentDidMount() {
        countryService.getAll().then(countries => {
            this.setState({countries:countries})
        })
    }
    handleSearchInput = (event) => { 
        this.setSearchString(event.target.value.trim())
    }
    setSearchString = (country) => {
        this.setState(prevState => {
            const newState = {...prevState}
            newState.filterString = country
            return newState
        })
    }
    render() {
      return (
        <div>
            <FilterCountries filterString = {this.state.filterString} 
                searchInputHandler={this.handleSearchInput} />
            <CountryView countries={this.state.countries} 
                filterString = {this.state.filterString}
                setSearchString={this.setSearchString} />
        </div>
      )
    }
  }  
  export default App