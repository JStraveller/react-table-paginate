import React from 'react'

export const UserInfo = ({user}) => (
  <div style={{marginTop: '170px'}}>
    <p>
      Выбран пользователь: <br/>
       <b>{` ${user.firstName} ${user.lastName}`}</b>
    </p>
    <p>
      Описание:
      <textarea defaultValue={user.description} readOnly rows="7" cols="30" />
    </p>
    <p>
      Адрес проживания: <b>{user.address.streetAddress}</b>
    </p>
    <p>
      Город: <b>{user.address.city}</b>
    </p>
    <p>
      Провинция/штат: <b>{user.address.state}</b>
    </p>
    <p>
      Индекс: <b>{user.address.zip}</b>
    </p>
  </div>
)