import React, { useState } from 'react';
import Input from './../components/Input';
import Title from './../components/Title';
import Button from './../components/Button';
import styled from 'styled-components';

const StyledWindow = styled.div`
    width 30%;
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display:flex;
    justify-content: center;
`;

const ROOT_URL = 'https://frebi.willandskill.eu/';
const LOGIN_URL = `${ROOT_URL}api-token-auth/`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email,
      password,
    };
    console.log(payload);
    try {
      fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          console.log(localStorage.getItem('token'));
        });
    } catch (err) {
      console.log(err);
    }
    setEmail('');
    setPassword('');
  }

  return (
      <div className="container">
        <StyledWindow>
        <form onSubmit={handleSubmit}>
            <Title 
                title="Login"
            />
            <Input
            placeholder="Name"
            type="text"
            name="email"
            value={email}
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <Input
            placeholder="Email"
            type="password"
            name="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <Button 
            btnText="login"
            type="submit" 
            />
        </form>
        </StyledWindow>
    </div>
  );
}
