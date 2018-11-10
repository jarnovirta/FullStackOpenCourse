import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            reviews: {
                "Hyvä": 0,
                "Neutraali": 0,
                "Huono": 0
            }
        }
    }
    handleReview = (review) => {
        return () => {
            this.setState((prevState) => {
                const newState = {
                    reviews: prevState.reviews
                }
                newState.reviews[review] += 1
                return newState
        })}
    }    
    
    render() {
        return (
            <div>
                <Statistics reviews={this.state.reviews}/>
                <Review clickHandler={this.handleReview.bind(this)}
                    reviewOptions={Object.keys(this.state.reviews)} />

            </div>
        )
    }    
}
const Review = ({clickHandler, reviewOptions}) => {
        return (
        <div>
            <h1>anna palautetta</h1>
            { reviewOptions.map((option, index) => <span key={index}><Button handleClick={clickHandler(option)} text={option}/></span>) }
        </div>
    )
}
const Statistics = ({reviews}) => {
    return (
        <div>
            <h1>statistiikka</h1>
            { Object.keys(reviews).map((review, index) => <p key={index}>{review} {reviews[review]}</p>) }
        </div>
    )
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'));