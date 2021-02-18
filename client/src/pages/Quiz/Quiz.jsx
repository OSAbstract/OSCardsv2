import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Quiz.css";
import axios from 'axios';


  // create a page to view all deck options, and create a get request to our DB
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deckNumber: this.props.location.state.deckNumber,
        deck: [],
        currentPosition: 0,
        side: null,
        currentSide: 'term'
    }
    this.handleFlip = this.handleFlip.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleSpeech = this.handleSpeech.bind(this);
}

componentDidMount() {
  let deckNumber = this.state.deckNumber
  axios.get(`/deck/${deckNumber}`)
    .then((res) => {
      console.log("res: ", res);
      this.setState({
        deck: res.data,
        side: res.data[this.state.currentPosition].term})
    })

    .catch((err) => {
      console.log("err: ", err);
  })
}

handleFlip() {
  if (this.state.currentSide === "term") {
  this.setState({
    currentSide: 'definition',
    side: this.state.deck[this.state.currentPosition].definition,
  })
  } else {
  this.setState({
    currentSide: 'term',
    side: this.state.deck[this.state.currentPosition].term
  })
  }

}
handleNext() {
  let newPosition = this.state.currentPosition + 1
  if(this.state.currentPosition === this.state.deck.length - 1) {
    newPosition = 0
  }
  this.setState({
    currentPosition: newPosition,
    side: this.state.deck[newPosition].term
  })
}

handlePrevious() {
  let newPosition = this.state.currentPosition - 1
  if(this.state.currentPosition === 0) {
    newPosition = this.state.deck.length - 1
  }
  this.setState({
    currentPosition: newPosition,
    side: this.state.deck[newPosition].term
  })
}

handleSpeech() {
  var msg = new SpeechSynthesisUtterance();
  msg.text = this.state.side;
  window.speechSynthesis.speak(msg);
}

    render() {
      let arr = []
            if (this.state.deck.length > 1) {
            arr = [<div key={this.state.currentPosition} className="flashcard">
              <button className="btn btn-primary" onClick={this.handleSpeech}>Text To Speech</button>
              <h5 className="card-title">{this.state.side}</h5>
              {/* <p className="card-text">{current.definition}</p> */}
              <button className="btn btn-primary" onClick={this.handlePrevious}>Previous</button>
              <button className="btn btn-primary" onClick={this.handleFlip}>Flip</button>
              <button className="btn btn-primary" onClick={this.handleNext}>Next</button>

              <div className="d-flex flex-row justify-content-around">
              </div>
            </div>]
            }
            
        return (
              <div id='cards'>
              {arr}
              </div>  
        )
    }
}

export default Quiz;
