import React, {Component} from 'react';
import Button from './Components/Common/Button/Button.js';
import Card from './Components/Common/Card/Card.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      toastMessage: ""
    };
  }

  componentDidMount = () => {
    this.getUsers()
  }

  returnToast = () => {
    document.getElementById('toast').style.visibility = "visible";
    setTimeout(() => {
      document.getElementById('toast').style.visibility = "hidden";
    }, 2500);
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
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value

    const url = `http://localhost:3300/users`;
    const config = { 
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }
    this.setState({ toastMessage: "New User Added" });
    await fetch(url, config)
      .then(response => {
        if (!response.status === 200 || !response.status === 201) {
          throw Error(response.message);
        } else {
          return this.returnToast();
        }
      });
  }

  deleteUser = (id) => {
    // console.log(id)
    const url = `http://localhost:3300/users/${id}`
    const config = {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json;'
      },
      body: JSON.stringify({
        id: id
      })
    }
    this.setState({ toastMessage: "User Deleted" });
    fetch(url, config)
      .then((response) => {
        return response;
      }).then(() => {
        return this.returnToast();
      });
  }

  render() {
    const {data, toastMessage} = this.state

    return (
      <div>
        <h1 className="Greeting">Hello Levi </h1>
        <h2 className="Title">Here the users</h2>
        <p id="toast" className="toastStyle">{toastMessage}</p>

        <div className="BtnWrapper">
          <div>
            <label>Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"></input>
          </div>
          <div>
            <label>Email</label>
            <input
              id="email"
              type="text"
              name="name"
              placeholder="Name"></input>
          </div>

          <Button 
            btnStyle="btn--success--outline"
            btnSize="btn--md"
            onClick={this.addUser}
          >Add a new user</Button>
        </div>

        {data.map(user => (
          <Card
            cardStyle="card--primary--outline"
            // cardSize="card--md"
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            onClick={() => {this.deleteUser(user.id)}}
          />
        ))}
      </div>
    );
  }
}

export default App;

