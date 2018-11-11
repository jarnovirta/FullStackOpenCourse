import React from 'react'

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko otsikko = {kurssi.nimi} />
            <Sisalto osat = {kurssi.osat} />
            <Yhteensa osat = {kurssi.osat } />
        </div>
    )    
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.tehtavia}</p>
        </div>
    )
}
const Otsikko = ({otsikko}) => {
    return (
        <div>
            <h1>{otsikko}</h1>
        </div>
    )
}
const Sisalto = (props) => {
    const osat = props.osat
    return (
        <div>
            { osat.map((osa, i) => {
                return <Osa nimi = {osa.nimi} tehtavia = {osa.tehtavia} key={i}/>
            }) }
        </div>
    )
}
const Yhteensa = (props) => {
    const totalCount = props.osat.reduce((total, osa) => total + osa.tehtavia, 0)
    return (
        <div>
            <p>yhteensä {totalCount} tehtävää</p>
        </div>
    )
}
export default Kurssi