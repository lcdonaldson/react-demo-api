import React, {useState, useRef} from 'react';
import Button from './Components/Common/Button/Button.js';
import Card from './Components/Common/Card/Card.js';
import './App.css';

const App = () => {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     users: [],
  //     toastMessage: ""
  //   };
  // }

  // componentDidMount = () => {
  //   this.getUsers()
  // }
  const [users, setUsers] = useState(0);
  const [toastMessage, setToastMessage] = useState();

  const nameRef = useRef();
  const emailRef = useRef();

  const returnToast = () => {
    document.getElementById('toast').style.visibility = "visible";
    setTimeout(() => {
      document.getElementById('toast').style.visibility = "hidden";
    }, 2500);
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:3300/users/', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const json = await response.json();
    // this.setState({
    //   users: json
    // });
    setUsers({users: json});
  }

  const addUser = async () => {
    // const name = document.getElementById('name').value
    // const email = document.getElementById('email').value
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log(name, email);
    const url = `http://localhost:3300/users`;
    const config = { 
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        // name: name,
        // email: email
      })
    }
    
    await fetch(url, config)
    .then(response => {
      if (!response.status === 200 || !response.status === 201) {
        throw Error(response.message);
      } else {
        return returnToast();
      }
      console.log(JSON.stringify(response, null, 2));
    });
    // this.setState({ toastMessage: "New User Added" });
    setToastMessage(toastMessage, "New User Added");
    getUsers();
  }

  const deleteUser = (id) => {
    const url = `http://localhost:3300/users/${id}`
    // const {users} = this.state;
    setUsers(users);

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

      // this.setState({ users, toastMessage: "User Deleted"});
      setToastMessage(toastMessage, "User Deleted");
      returnToast();
  }

  // render() {
  //   const {users, toastMessage} = this.state

  return (
    <div>
      <h1 className="Greeting">Hello Levi </h1>
      <h2 className="Title">Here the users</h2>
      <p id="toast" className="toastStyle">{toastMessage}</p>

      <div className="form-wrapper">
        <div>
          <label>Name</label>
          <input
            ref={nameRef}
            id="name"
            type="text"
            name="name"
            placeholder="Name"></input>
        </div>
        <div>
          <label>Email</label>
          <input
            ref={emailRef}
            id="email"
            type="text"
            name="name"
            placeholder="Name"></input>
        </div>
        <div className="btn-wrapper">
          <Button
            btnStyle="btn--success--outline"
            btnSize="btn--sm"
            onClick={addUser}
          >Add a new user</Button>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {[users].map(user => (
          <div style={{flex: 1}}>
          <Card
            cardStyle="card--primary--outline br4"
          // cardSize="card--md"
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            exit={() => {deleteUser(user.id)}}
          />
          </div>
        ))}
      </div>
    </div>
  );
  // }
}

export default App;

