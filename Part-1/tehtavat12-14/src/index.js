import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
    constructor(props) {
      super(props)
      let votes = []
      props.anecdotes.forEach(() => votes.push(0))
      this.state = {
        selected: 0,
        votes: votes      
        }
    }
    getMostVotedAnecdoteIndex = () => {
        return this.state.votes.indexOf(Math.max.apply(Math, this.state.votes))
    }
    changeAnecdoteHandler = () => {
        this.setState({ selected: Math.floor(Math.random() * this.props.anecdotes.length)})
    }
    voteHandler = (anecdoteIndex) => { 
        return () => { 
            this.setState(prevState => {
                const newVotes = [...prevState.votes]
                let voteCount =  newVotes[anecdoteIndex]
                if (isNaN(voteCount)) voteCount = 0
                newVotes[anecdoteIndex] = ++voteCount
                return { votes: newVotes}
            })}
    }
    render() {
      let mostVotedIndex = this.getMostVotedAnecdoteIndex()
      console.log(mostVotedIndex)
      return (
        <div>
            <Anecdote text = {this.props.anecdotes[this.state.selected]} 
                votes = {this.state.votes[this.state.selected]} />
            <button onClick={this.voteHandler(this.state.selected)}>vote</button>
            <button onClick={this.changeAnecdoteHandler}>next anecdote</button>

            <h2>anecdote with most votes:</h2>
            <Anecdote text = {this.props.anecdotes[mostVotedIndex]} 
                votes = {this.state.votes[mostVotedIndex]} />
        </div>
      )
    }
  }
  const Anecdote = ( {text, votes }) => {
      return (
          <div>
            <p>{text}</p>
            <p>has {votes} votes</p>
          </div>
      )
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
