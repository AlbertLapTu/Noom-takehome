import React from 'react';

/*
Card container should initiate the API request on search, and render the Menu card components



*/

export default class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      searchQuery: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch('https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=chicken')
      .then(res => res.json())
      .then(data => {
        this.setState({ foods: data });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className='App'>
        <h1>Noom Food Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the key word:
            <input
              type='text'
              name='searchQuery'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <button type='submit' onSubmit={this.handleSubmit}>
            Search
          </button>
        </form>
        {/* {this.renderList(this.state.foods)} */}
      </div>
    );
  }
}
