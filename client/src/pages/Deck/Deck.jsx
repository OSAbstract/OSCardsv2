import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Deck.css";
import axios from 'axios';


// create a page to view deck one cards, and create a get request to our DB
// upon component did mount GET all cards in deck 1
class Deck extends Component {
  constructor(props) {
      super(props);
      this.state = {
          deck: [],
      }
  }
     
  componentDidMount() {
    const {deckNumber} = this.props.location.state
    console.log(deckNumber)

    axios.get(`/deck/${deckNumber}`)
      .then((res) => {
        console.log("res: ", res);
        this.setState({deck: res.data})  // {deck: [{card1}, {card2}]}
      })
      .catch((err) => {
        console.log("err: ", err);
    })
  }
  
  render(){
    // iterate through the response array of objects (this.state.deck)
    // render a component for each card object
    // ### provide flashcard styling
    // ### provide flashcard functionality
    const componentsToRender = [];
    
    const inputArray = this.state.deck || [];
    console.log('input array', inputArray)

    const deleteHandler = (event) => {
      let deck = this.state.deck; // [{}]
      let id = event.target.value;
      // want to  look into deck in our state
      // itterate over that array (deck) and remove the card that has the id ^
      let updatedDeck = deck.filter(card => card._id !== id)

      axios.delete(`/card/${id}`)
        .then((res) => {
          console.log('res:', res);
          this.setState({deck: updatedDeck})
        })
        .catch((err) => {
          console.log("err: ", err);
        })
      //axios request to event.target.value; --> localhost:3000/cards/objectID(9348759238475934)
    }

    const updateHandler = (event) => {
      let deck = this.state.deck; // [{}]
      let id = event.target.value; // mongoDB document _id
      let index = event.target.index; // index of card being modified within deck array

      axios.patch(`/card/${id}`)
        .then((res) => {
          console.log('res patch:', res)
          // let updatedCard = res
          // this.setState({deck[index] = })
        })
    }

    inputArray.map((current, i) => {
        componentsToRender.push(
          <div key={i} className="flashcard">
            <h5 className="card-title">{current.term}</h5>
            <p className="card-text">{current.definition}</p>
            <div className="d-flex flex-row justify-content-around">
              <button type="button" className="btn btn-primary btn-sm" value={current._id} onClick={(event) => deleteHandler(event)}>delete card</button>
              <Link to={{
                pathname: `/update`,
                state: {
                  id: `${current._id}`
                }
              }} 
              className="btn btn-primary btn-sm" index={i} value={current._id}>update card</Link>                
              {/* <button type="button" className="btn btn-primary btn-sm" index={i} value={current._id} onClick={(event) => updateHandler(event)}>update card</button> */}
            </div>
          </div>
        )
        
    })
    return (
        <div className="cards">
            {componentsToRender}
        </div>

)
}
}


export default Deck;

