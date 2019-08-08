import React from 'react';
import MenuCard from '../MenuCard/MenuCard';

export default class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      searchQuery: ''
    };
  }

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        const { searchQuery } = this.state;
        if (searchQuery.length < 3) {
          return null;
        } else {
          fetch(
            `https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${searchQuery}`
          )
            .then(res => res.json())
            .then(data => {
              this.setState({ foods: data });
            });
        }
      }
    );
  };

  render() {
    const { foods } = this.state;

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
          <button type='submit'>Search</button>
        </form>
        <MenuCard foods={foods} />
      </div>
    );
  }
}
