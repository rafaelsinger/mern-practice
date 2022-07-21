import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  type User = {
    name: string,
    age: number,
    username: string
  }

  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [username, setUsername] = useState<string>('');

  const fetchData = async () => {
    const data = await Axios.get('http://localhost:5000/getUsers');
    setUsersList(data.data);
  }

  const createUser = () => {
    const user: User = {name, age, username};
    setUsersList(prevList => [...prevList, user])
    Axios.post('http://localhost:5000/createUser', {name, age, username} )
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <div className='usersDisplay'>
        {usersList.map(user => {
          return (
            <div>
              <h1>{user.name}</h1>
              <h1>{user.age}</h1>
              <h1>{user.username}</h1>
            </div>
          )
        })}
      </div>

      <div>
        <input type='text' placeholder='Name...' onChange={e => setName(e.target.value)} />
        <input type='number' placeholder='Age...' onChange={e => setAge(parseInt(e.target.value))} />
        <input type='text' placeholder='Username...' onChange={e => setUsername(e.target.value)}/>
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
