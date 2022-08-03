import React from 'react'

import '../styles/Header.scss';

import Button from './Button';

const Header = ({ title, ToggleAddForm, addForm }) => {

  return (
    <header className='header'>
        <h1> { title } </h1>
        <Button 
            color={ addForm ? "#1781b2 " : "#89CFF0" }
            text={ addForm ? "CLOSE" : "OPEN" }
            ToggleAddForm={ToggleAddForm} 
            addForm={addForm}
        />
    </header>
  )
}

export default Header
