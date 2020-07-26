import React, { useState, useEffect } from 'react';
import { Table } from './components/Table'


const App = () => {

  const [data, setData] = useState([])

  useEffect(() => {

    const url = `http://www.filltext.com/?rows=5&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`

    const fetchData = async (url) => {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    }

    fetchData(url)

  }, []);

  const [sort, setSort] = useState({ reverseDir: false, lastSorted: "" })

  const sortCol = colName => {

    const sorted = [...data].sort((first, next) => {
      if (colName === sort.lastSorted && sort.reverseDir) {
        //sort by DESC
        return (first[colName] > next[colName]) ? -1 : 1
      } else {
        //sort by ASC
        return (first[colName] > next[colName]) ? 1 : -1
      }
    })
    let reverse  //false
    if (colName !== sort.lastSorted && sort.reverseDir === true) {
      reverse = sort.reverseDir
    } else {
      reverse = !sort.reverseDir
    }
    setSort({ reverseDir: reverse, lastSorted: colName })
    setData(sorted)
  }


  return (
    <div className='container'>
      <h1>Table</h1>
      <div className='row'>
        <div className='ten columns'>
          <Table
            data={data}
            sortCol={sortCol}
            isReverse={sort.reverseDir}
          />
        </div>
        <div className='two columns'>11</div>
      </div>
    </div>
  );


}

export default App;