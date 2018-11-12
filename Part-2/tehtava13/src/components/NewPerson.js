import React from 'react'

const NewPerson = ({nameInputHandler, numberInputHandler, addOrUpdatePersonHandler, newName, newNumber}) => {
    return (
        <form onSubmit={addOrUpdatePersonHandler}>
            <div>
            nimi: <input value={newName} onChange={nameInputHandler} />
            </div>
            <div>
                numero: <input value={newNumber} onChange={numberInputHandler}/>
            </div>
            <div>
            <button type="submit">lisää</button>
            </div>
        </form>
    )    
}
export default NewPerson