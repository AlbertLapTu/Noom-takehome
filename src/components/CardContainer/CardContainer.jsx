import React from 'react';
import MenuCard from '../MenuCard/MenuCard';
import HeaderImage from './assets/image.png';
import debounce from '../../utilities/utilityFunctions';

export default class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      searchQuery: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleKeyDown = () => {
    const { searchQuery } = this.state;

    if (searchQuery.length < 3) {
      return;
    } else {
      fetch(`https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ foods: data });
        });
    }
  };

  render() {
    const { foods } = this.state;

    return (
      <div className='App'>
        <img src={HeaderImage} />
        <h1>Noom Food Explorer</h1>
        <form>
          <label>
            Enter the key word:
            <input
              type='text'
              name='searchQuery'
              onChange={this.handleChange}
              onKeyDown={debounce(this.handleKeyDown, 200)}
            />
          </label>
          <button type='submit'>Search</button>
        </form>
        {foods.length === 0 ? null : <MenuCard foods={foods} />}
      </div>
    );
  }
}
