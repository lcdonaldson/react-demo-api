import React, {Component} from 'react';
import Button from './Components/Common/Button/Button.js';
import Card from './Components/Common/Card/Card.js';
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
        <h1 className="Greeting">Hello Levi </h1>
        <h2 className="Title">Here the other users</h2>
        {data.map(user => (
          <Card
            key={user.id}
            // id={user.id}
            name={user.name}
            email={user.email}
          />
        ))}
        <div className="BtnWrapper">
          <Button 
            btnStyle="btn--success--solid"
            btnSize="btn--md"
          >Add a new user</Button>
        </div>
      </div>
    );
  }
}

export default App;

