import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_n, setfirst_n] = useState('');
  const [last_n, setlast_n] = useState('');
  const [email, setemail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  //Login __________________________________________________________________
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('username', data.cur_user.username);
        localStorage.setItem('highscore', data.cur_user.highScore);
        navigate('/game');
      } else {
        setErrorMessage(data.mssg)
      }

    } catch (error) {
      console.error(error);
    }
  };






  //Register __________________________________________________________________
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_n,
            last_n,
            email,
            username,
            password
          })
        });
    
        const data = await response.json();
    
        if (response.ok) {
          localStorage.setItem('username', data.cur_user.username);
          localStorage.setItem('highscore', data.cur_user.highScore);
          navigate('/game');
        } else {
            setErrorMessage(data.mssg);
        }
      } catch (error) {
        console.error(error);
      }
  };




  const renderLoginForm = () => (
    
    <form onSubmit={handleLoginSubmit}>
      <label> 
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <button type="submit" style={{ marginLeft: '15px', marginTop: '6.5px' }}>Login</button>
      <button className="new-user-button" style={{ marginLeft: '45px', marginTop: '6.5px' }} onClick={() => setIsRegistering(true)}>New user click here</button>
    </form>
  );
  

  const renderRegistrationForm = () => (
    <form onSubmit={handleRegisterSubmit}>
      <label>
        First Name:
        <input type="text" value={first_n} onChange={(event) => setfirst_n(event.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={last_n} onChange={(event) => setlast_n(event.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" className="email-input" value={email} onChange={(event) => setemail(event.target.value)} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </label>
      <br />
      <button type="submit" style={{ marginLeft: '50px', marginTop: '6.5px' }}>Register</button>
      <button className="new-user-button" style={{ marginLeft: '45px', marginTop: '6.5px' }} onClick={() => setIsRegistering(false)}>Cancel</button>
    </form>
  );

  return (
    <div className="login sniper-background">
      <h2>Target Practice MERN Stack</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isRegistering ? renderRegistrationForm() : renderLoginForm()}
    </div>
  );
};

export default Home;
