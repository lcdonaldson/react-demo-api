import React, {Component} from 'react';
import Button from './Components/Common/Button/Button.js';
import Card from './Components/Common/Card/Card.js';
import './App.css';

// TODO: Soon app with be changed to functional component

class App extends Component {
  // const [users, setUsers] = useState([]);
  // const [toastMessage, setToastMessage] = useState("");
  constructor(props){
    super(props);
    this.state = {
      users: [],
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
      users: json
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
    await fetch(url, config)
    .then(response => {
      if (!response.status === 200 || !response.status === 201) {
        throw Error(response.message);
      } else {
        return this.returnToast();
      }
    });
    this.setState({ toastMessage: "New User Added" });
    this.getUsers();
  }

  deleteUser = (id) => {
    const url = `http://localhost:3300/users/${id}`
    const {users} = this.state;
    const index = users.findIndex(user => user.id === id);

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
    
    fetch(url, config)
      .then((response) => {return response;})

      if (index === -1) return;
      users.splice(index, 1);

      this.setState({ users, toastMessage: "User Deleted"});
      this.returnToast();
  }

  render() {
    const {users, toastMessage} = this.state

    return (
      <div>
        <h1 className="Greeting">Hello Levi </h1>
        <h2 className="Title">Here the users</h2>
        <p id="toast" className="toastStyle">{toastMessage}</p>

        <div className="form-wrapper">
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
          <div className="btn-wrapper">
            <Button
              btnStyle="btn--success--outline"
              btnSize="btn--sm"
              onClick={this.addUser}
            >Add a new user</Button>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {users.map(user => (
            <div style={{flex: 1}}>
            <Card
              cardStyle="card--primary--outline br4"
            // cardSize="card--md"
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              exit={() => {this.deleteUser(user.id)}}
            />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

