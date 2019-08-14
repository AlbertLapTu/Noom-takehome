import React from 'react';
import MenuCard from '../MenuCard/MenuCard';
import HeaderImage from './assets/image.png';
import debounce from '../../utilities/utilityFunctions';
import './CardContainer.css';

export default class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
      searchQuery: null,
      maxWindowHeight: 0,
      currentPage: 1
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScrollLocation);
  };

  getDocHeight = () => {
    var D = document;
    return Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
  };

  handleFetchPage = () => {
    const { foods, currentPage, searchQuery } = this.state;

    fetch(
      `https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${searchQuery}&pg=${currentPage}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          foods: [...foods, ...data],
          currentPage: currentPage + 1
        });
      });
  };

  handleScrollLocation = () => {
    const { maxWindowHeight } = this.state;
    let percentileRange = maxWindowHeight - maxWindowHeight * 0.1;

    if (window.scrollY >= percentileRange) {
      this.handleFetchPage();
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleKeyDown = () => {
    const { searchQuery } = this.state;

    //append param pg=#
    if (searchQuery.length < 3) {
      return;
    } else {
      fetch(`https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ foods: data, maxWindowHeight: this.getDocHeight() });
        });
    }
  };

  render() {
    const { foods } = this.state;
    return (
      <div className='App'>
        <div className='header-container'>
          <img src={HeaderImage} alt='header' />
          <div className='header-content'>
            <h1>Noom Food Explorer</h1>
            <form>
              <div className='label'>
                <label>Enter the key word:</label>
              </div>
              <input
                type='text'
                name='searchQuery'
                onChange={this.handleChange}
                onKeyDown={debounce(this.handleKeyDown, 200)}
                onScroll={this.handleOnScroll}
              />
              <button className='search-btn' type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>
        <ul>{foods.length === 0 ? null : <MenuCard foods={foods} />}</ul>
      </div>
    );
  }
}
