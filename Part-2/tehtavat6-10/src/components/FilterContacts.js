import React from 'react'

const FilterContacts = ({filterString, searchInputHandler}) => {
    return (<div>
        rajaa näytettäviä: : <input value={filterString}
                                onChange={searchInputHandler} />
    </div>)
}
export default FilterContacts