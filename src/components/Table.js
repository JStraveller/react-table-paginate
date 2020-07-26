import React from 'react'

export const Table = ({data, sortCol, isReverse}) => {
  return (
    <table className='u-full-width'>
      <thead>
        <tr>
          <th onClick={() => sortCol('id')} >ID</th>
          <th onClick={() => sortCol('firstName')}>Firstname </th>
          <th onClick={() => sortCol('lastName')}>Lastname</th>
          <th onClick={() => sortCol('email')}>email</th>
          <th onClick={() => sortCol('phone')}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={`key-${item.id}+${item.email}`}>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
