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
            <h1>{props.kurssi.nimi}</h1>
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
    let yht = 0
    props.osat.map(osa => yht += osa.tehtavia)
    return (
        <div>
            <p>yhteensä {yht} tehtävää</p>
        </div>
    )
}
const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]
    }

  return (
    <div>
        <Otsikko kurssi = {kurssi} />
        <Sisalto osat = {kurssi.osat} />
        <Yhteensa osat = {kurssi.osat } />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)