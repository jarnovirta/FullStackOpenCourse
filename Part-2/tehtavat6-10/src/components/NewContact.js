import React from 'react'

const NewContact = ({nameInputHandler, numberInputHandler, addContactHandler, newName, newNumber}) => {
    return (
        <form onSubmit={addContactHandler}>
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
export default NewContact