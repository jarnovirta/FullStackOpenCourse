import React from 'react'
import NewPerson from './components/NewPerson'
import Filterpersons from './components/FilterPersons'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filterString: '',
        message: null

      }
    }
    componentDidMount() {
        personService.getAll().then(persons => {
            this.setState({persons:persons})
        })
    }
    updatePerson(id, newPerson) {
        if (window.confirm(newPerson.name + " on jo luettelossa,"
               + " korvataanko vanha numero uudella?")) {
                   personService.update(id, newPerson).then((updatedPerson) => {
                    this.setState(prevState => {
                        const newState = {...prevState, newName: '', newNumber: '', message: 'päivitettiin ' + newPerson.name}
                        newState.persons = newState.persons.map(person => {
                            if (person.id === updatedPerson.id) return updatedPerson
                            else return person
                        })                        
                        return newState
                   })

                })
                // Person has been removed from db
                .catch(() => {
                    this.setState((prevState) => ({...prevState, persons: prevState.persons.filter(person => person.id !== id)}) ) 
                    this.addPerson(newPerson)
                })    
        }        
    }
    addPerson(person) {
        personService.create(person).then(savedPerson => {
            const persons = this.state.persons.concat(savedPerson)
            this.setState({persons, newName: '', newNumber: '', message: 'lisättiin ' + person.name})
        })
    }
    addOrUpdatePersonHandler = (event) => {
        event.preventDefault()
        const newPerson = { 
            name: this.state.newName, 
            number: this.state.newNumber
        }
        const existingPerson = this.state.persons.find(person => person.name.toLowerCase() === newPerson.name.toLocaleLowerCase())
        if (existingPerson) this.updatePerson(existingPerson.id, newPerson)
        else this.addPerson(newPerson)
     }
    deletePersonHandler = (person) => { 
        return () => {
            if (window.confirm("poistetaanko " + person.name)) {
                personService.remove(person.id).then(() => this.setState(prevState => {
                    const newState = {...prevState, message: 'poistettiin ' + person.name}
                    newState.persons = newState.persons = newState.persons.filter(oldPerson => oldPerson !== person)
                    return newState
                }))
            }    
        }    
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

    render() {
      return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={this.state.message} />
            <Filterpersons filterString={this.state.filterString} 
                searchInputHandler={this.handleSearchInput} />
            <h3>Lisää uusi / muuta olemassaolevan numeroa</h3>    
            <NewPerson nameInputHandler={this.handleNameInput}
                numberInputHandler={this.handleNumberInput}
                addOrUpdatePersonHandler={this.addOrUpdatePersonHandler} 
                newName={this.state.newName}
                newNumber={this.state.newNumber}/>
            <h2>Numerot</h2>
            <Persons persons={this.state.persons} 
                filterString={this.state.filterString} 
                deletePersonHandler={this.deletePersonHandler} />
        </div>
      )
    }
  }
  
  export default App