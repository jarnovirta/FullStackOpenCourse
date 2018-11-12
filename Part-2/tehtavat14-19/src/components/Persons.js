import React from 'react'

const Rows =  ({persons, filterString, deletePersonHandler }) => 
    persons.filter(person => 
        person.show = (filterString === '' 
            || person.name.toLowerCase().indexOf(filterString.toLowerCase()) > -1)
    )
    .map(person => 
        <tr key={person.name}>
            <td>{person.name} {person.number}</td>
            <td><button onClick={deletePersonHandler(person)}>poista</button></td>
        </tr>
    )
   
const Persons = (props) => {
    return (
        <table>
            <tbody>
                <Rows persons={props.persons} 
                    filterString={props.filterString} 
                    deletePersonHandler={props.deletePersonHandler} />
            </tbody>            
        </table>
    )
}

export default Persons    