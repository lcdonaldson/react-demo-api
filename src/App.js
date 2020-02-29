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

  getUsers = async () => {
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

  addUser = async () => {
    console.log('clicked');
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <h1 className="Greeting">Hello Levi </h1>
        <h2 className="Title">Here the other users</h2>
        {data.map(user => (
          <Card
            cardStyle="card--primary--outline"
            // cardSize="card--md"
            key={user.id}
            // id={user.id}
            name={user.name}
            email={user.email}
          />
        ))}
        <div className="BtnWrapper">
          <Button 
            btnStyle="btn--success--outline"
            btnSize="btn--md"
            onClick={this.addUser}
          >Add a new user</Button>
        </div>
      </div>
    );
  }
}

export default App;

