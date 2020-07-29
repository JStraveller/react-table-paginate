import React from 'react'

export const Table = ({data, sortCol, isReverse, onSelect, lastSorted}) => {
  return (
    <table >
      <thead>
        <tr>
          <th onClick={() => sortCol('id')} >ID {lastSorted === 'id' && isReverse ? '▼' : '▲'}</th>
          <th onClick={() => sortCol('firstName')}>Firstname {lastSorted === 'firstName' && isReverse ? '▼' : '▲' }</th>
          <th onClick={() => sortCol('lastName')}>Lastname {lastSorted === 'lastName' && isReverse ? '▼' : '▲' }</th>
          <th onClick={() => sortCol('email')}>email {lastSorted === 'email' && isReverse ? '▼' : '▲'}</th>
          <th onClick={() => sortCol('phone')}>Phone {lastSorted === 'phone' && isReverse ? '▼' : '▲'}</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={`key-${Math.random() * 1000}+${item.email}`} onClick={() => onSelect(item)}>
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
