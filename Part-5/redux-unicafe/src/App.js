import React from 'react'
import PropTypes from 'prop-types'
import Statistics from './components/Statistics'

class App extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    klik = (nappi) => () => {

        console.log(nappi)
        this.context.store.dispatch({ type: nappi })

    }

    render() {
        return (
        <div>
            <h2>anna palautetta</h2>
            <button onClick={this.klik('GOOD')}>hyvä</button>
            <button onClick={this.klik('OK')}>neutraali</button>
            <button onClick={this.klik('BAD')}>huono</button>
            <Statistics />
        </div>
        )
    }
}
App.contextTypes = {
    store: PropTypes.object
  }
export default App