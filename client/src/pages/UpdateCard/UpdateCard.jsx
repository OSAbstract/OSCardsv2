import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./UpdateCard.css";
import axios from 'axios';

class UpdateCard extends Component {
  constructor(props) {
    super(props);
  // set our state to empty value to be updated in the forms rendered below
    this.state = {
        term: undefined,
        definition: undefined,
        deckId: this.props.location.state.deck,
        cardId: this.props.location.state.id,
        cardTerm: this.props.location.state.term,
        cardDefinition: this.props.location.state.definition
    }
  // binding our functionality to 'this' to allow it to function within our component.
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleTerm = this.handleTerm.bind(this);
  this.handleDefinition = this.handleDefinition.bind(this);
  }
  // handles updating our term state value with any input it receives. 
  handleTerm(event) {
    event.preventDefault();
    this.setState({term: event.target.value})
  // console.log(this.state.cardForm)
  }
  // handles updating our definition state value with any input it receives.
  handleDefinition(event) {
    event.preventDefault();
    this.setState({definition: event.target.value})
  }

  // handles our post request to our database taking the values currently saved in state
  handleSubmit() {
    let term = this.state.term
    let definition = this.state.definition
    let deckId = this.state.deck
    let obj = {
      term,
      definition,
    }
    axios.patch(`/card/${this.state.cardId}`, obj)
    .then((res) => {
      console.log("res:", res);
      let array = Array.from(document.querySelectorAll("input"));
      console.log(array);
      Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  
    })
    .catch((err) => {
      console.log("err: ", err);
    })
  }



  // The render below deals with creating a form with a dropdown menu that has numbers associated to the decks available to the user.

  render () {
    console.log(this.props.location.state);
    let context = this;
    return (
      <div className='addcard'>
        {/* // card form h2 "CARD FORM" */}
        <h2 className="addcard">Update A Flash Card</h2>
        <form className="cardform">
          <div  className="mb-3">
            <label htmlFor="formGroupExampleInput"  className="form-label">Term</label>
            <input type="text"  className="form-control" id="formGroupExampleInput" defaultValue={this.state.cardTerm} onChange={(e) => context.handleTerm(event)}/>
          </div>      
          <div  className="mb-3">
            <label htmlFor="formGroupExampleInput2"  className="form-label">Definition</label>
            <input type="text"  className="form-control" id="formGroupExampleInput2" defaultValue={this.state.cardDefinition} onChange={(e) => context.handleDefinition(event)}/>
          </div>
        </form>
        <div className="d-flex flex-row justify-content-center align-content-center mt-3">
          <Link to={{
                pathname: `/deck`,
                state: {
                  deckNumber: `${this.state.deckId}`
          }}
              } className="btn btn-primary" type="submit" onClick={context.handleSubmit}>Update</Link>
        </div>
      </div>
    )
  }
}

export default UpdateCard;
