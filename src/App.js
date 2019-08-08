import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '', 
      foods: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=chicken')
      .then(res => res.json())
      .then(data => {
        this.setState({foods: data})
      });
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  renderList(foods) {
    var list = [];
    foods.forEach(v => {
      list.push(
        <div style={{marginBottom: "40px", display: "flex", flexDirection: "column"}}>
          <div>
            name: {v.name}
          </div>
          <div>
            brand: {v.brand}
          </div>
          <div>
            calories: {v.calories}
          </div>
          <div>
            portion: {v.portion}
          </div>
        </div>
      )
    });
    return (
      <div>
        <h3>Result:</h3>
        {list}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Noom Food Explorer</h1>
        <form onSubmit={this.handleSubmit}>
        <label>
          Enter the key word:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
          <button type="submit">Search</button>
        </form>
        {this.renderList(this.state.foods)}
      </div>
    );
  }
}

export default App;
