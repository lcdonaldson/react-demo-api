import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = () => {
    this.getUsers()
  }

  async getUsers() {
    const response = await fetch('http://localhost:3300/users/', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const json = await response.json();
    this.setState({
      data: json
    });
  }

  render() {
    const {data} = this.state
    return (
      <div>
        {data.map(user => (
          <ul className="Card" key={user.id}>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </ul>
        ))}
      </div>
    );
  }

}

export default App;
