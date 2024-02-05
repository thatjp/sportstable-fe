import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import { logout } from '../../requests/axios' 

const NavBar = () => {
  let navigate = useNavigate();

  const clickHandler = () => {
    const items = JSON.parse(localStorage.getItem('token'));
    logout(items.access, items.refresh)
    navigate("/signup");
  }

  return (
    <div>
      <h1>NavBar</h1>
      <Button text="Log Out" type='submit' handleClick={() => clickHandler()}/>
    </div>
  )
}

export default NavBar