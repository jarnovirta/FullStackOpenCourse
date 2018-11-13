import React from 'react'
import NewContact from './components/NewContact'
import FilterContacts from './components/FilterContacts'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filterString: ''
      }
    }
    componentDidMount() {
        personService.getAll().then(persons => {
            this.setState({persons:persons})
        })
    }
    addContactHandler = (event) => {
        event.preventDefault()
        const newContact = { 
            name: this.state.newName, 
            number: this.state.newNumber
        }
        if (this.state.persons.find(person => person.name.toLowerCase() === newContact.name.toLowerCase())) {
            alert("Henkilö on jo puhelinluettelossa!")
            return
        }
        const persons = this.state.persons.concat(newContact)
        this.setState({persons, newName: '', newNumber: ''})
    }
    handleNameInput = (event) => { this.setState({ newName: event.target.value }) }

    handleNumberInput = (event) => { this.setState({ newNumber: event.target.value })}

    handleSearchInput = (event) => { 
        const input = event.target.value
        this.setState(prevState => {
            const newState = {...prevState}
            newState.filterString = input
            return newState
        })
    }
    filterContacts(persons) {
        persons.forEach(person => 
            person.show = (this.state.filterString === '' 
                || person.name.toLowerCase().indexOf(this.state.filterString.toLowerCase()) > -1)
        )
    }
    render() {
        const Contacts = () => this.state.persons.filter(person => person.show)
            .map(person => <p key={person.name}>{person.name} {person.number}</p>)
      return (
        <div>
            <h2>Puhelinluettelo</h2>
            <FilterContacts filterString = {this.state.filterString} 
                searchInputHandler={this.handleSearchInput} />
            <NewContact nameInputHandler={this.handleNameInput}
                numberInputHandler={this.handleNumberInput}
                addContactHandler={this.addContactHandler} 
                newName={this.state.newName}
                newNumber={this.state.newNumber}/>
            <h2>Numerot</h2>
            <Contacts contacts={this.filterContacts(this.state.persons)} />
        </div>
      )
    }
  }
  
  export default App