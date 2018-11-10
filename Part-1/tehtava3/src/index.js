import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.tehtavia}</p>
        </div>
    )
}
const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
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
    return (
        <div>
            <p>yhteensä {props.yhteensa} tehtävää</p>
        </div>
    )
}
const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
    const osat = [ osa1, osa2, osa3 ]
  return (
    <div>
        <Otsikko kurssi = {kurssi} />
        <Sisalto osat = {osat} />
        <Yhteensa yhteensa = { osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia } />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)