import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            reviews: {
                "Hyvä": {count: 0, value: 1, positive: true},
                "Neutraali": {count: 0, value: 0},
                "Huono":  {count: 0, value: -1},
            },
            reviewAvg: 0,
            posReviewPercent: 0
        }
    }
    handleReview = (review) => {
        return () => {
            this.setState((prevState) => {
                const newState = {
                    reviews: prevState.reviews
                }
                let reviews = newState.reviews, sum = 0, totalCount = 0, positiveCount = 0
                reviews[review].count += 1
                Object.keys(reviews).map((review) => {
                    sum += reviews[review].value * reviews[review].count
                    totalCount += reviews[review].count
                    if (reviews[review].positive === true) {
                        positiveCount += reviews[review].count
                    }
                }    
                )
                if (totalCount > 0) {
                    this.state.reviewAvg = Number((sum / totalCount).toFixed(2))
                    this.state.posReviewPercent =  Number((positiveCount / totalCount * 100).toFixed(2))
                }    
                return newState
        })}
    }    
    
    render() {
        return (
            <div>
                <Statistics state={this.state}/>
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
const Statistics = ({state}) => {
    return (
        <div>
            <h1>statistiikka</h1>
            { Object.keys(state.reviews).map((review, index) => <p key={index}>{review} {state.reviews[review].count}</p>) }
            <p>keskiarvo {state.reviewAvg}</p>
            <p>positiivisia {state.posReviewPercent}</p>
        </div>
    )
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'));