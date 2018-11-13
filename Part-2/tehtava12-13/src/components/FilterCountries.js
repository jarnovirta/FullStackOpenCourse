import React from 'react'

const FilterCountries = ({filterString, searchInputHandler}) => {
    return (<div>
        find countries: : <input value={filterString}
                                onChange={searchInputHandler} />
    </div>)
}
export default FilterCountries