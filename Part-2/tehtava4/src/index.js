import React from 'react'
import ReactDOM from 'react-dom'

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
const App = () => {
    const kurssit = [
        {
          nimi: 'Half Stack -sovelluskehitys',
          id: 1,
          osat: [
            {
              nimi: 'Reactin perusteet',
              tehtavia: 10,
              id: 1
            },
            {
              nimi: 'Tiedonvälitys propseilla',
              tehtavia: 7,
              id: 2
            },
            {
              nimi: 'Komponenttien tila',
              tehtavia: 14,
              id: 3
            }
          ]
        },
        {
          nimi: 'Node.js',
          id: 2,
          osat: [
            {
              nimi: 'Routing',
              tehtavia: 3,
              id: 1
            },
            {
              nimi: 'Middlewaret',
              tehtavia: 7,
              id: 2
            }
          ]
        }
      ]
    
      return (
        <div>
            { kurssit.map((kurssi) => <Kurssi kurssi={kurssi} />)} 
        </div>
      )
    }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)