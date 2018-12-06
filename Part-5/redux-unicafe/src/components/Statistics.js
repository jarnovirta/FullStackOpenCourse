import React from 'react'
import PropTypes from 'prop-types'

class Statistics extends React.Component {
    componentDidMount() {
        this.store = this.context.store

        this.unsubscribe = this.store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    zero = () => {
        this.store.dispatch({ type: 'ZERO' })
    }

    render () {
        const state = this.context.store.getState()
        const palautteita = state.good + state.ok + state.bad

        if (palautteita === 0) {
            return (
            <div>
                <h2>stataistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
            )
        }
        return (
            <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{state.good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{state.ok}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td></td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{state.bad}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <button onClick={this.zero}>nollaa tilasto</button>
            </div >
        )
    }
}
Statistics.contextTypes = {
    store: PropTypes.object
  }
export default Statistics