import React from 'react'

const FilterPersons = ({filterString, searchInputHandler}) => {
    return (<div>
        rajaa näytettäviä: : <input value={filterString}
                                onChange={searchInputHandler} />
    </div>)
}
export default FilterPersons