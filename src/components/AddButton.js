import React, { useState } from 'react'

export const AddButton = ({addUser}) => {

  const initUser = {id: '', firstName: '', lastName: '', email: '', phone: ''}

  const [userState, setUserState] = useState(initUser)


  const handleChange = e => {
    const {value} = e.target


    const name = e.target.dataset.name
    setUserState({...userState, [name]: value })
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    if (!userState.id 
      || !userState.firstName 
      || !userState.lastName 
      || !userState.email 
      || !userState.phone) return
    addUser(userState)
    setUserState(initUser)
  }

  return (
    <form >

      <input type="number" min='0' onChange={handleChange} data-name='id' placeholder='ID' value={userState.id} />

      <input type="text" onChange={handleChange} data-name='firstName' placeholder='Firstname' value={userState.firstName}/>

      <input type="text" onChange={handleChange} data-name='lastName' placeholder='Lastname' value={userState.lastName}/>

      <input type="email" onChange={handleChange} data-name='email' placeholder='email' value={userState.email}/>
      
      <input type="tel" onChange={handleChange} data-name='phone' placeholder='Phone' value={userState.phone}/>

      <button type='submit' onClick={handleSubmit} style={{ backgroundColor: '#f2c3c3'}}>Add row</button>
    </form>
  )
}