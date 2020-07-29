import React, { useState } from 'react';
import './style.css'
import ReactPaginate from 'react-paginate'
import { Table } from './components/Table'
import { Filter } from './components/Filter'
import { Loader } from './components/Loader'
import { UserInfo } from './components/UserInfo'
import { AddButton } from './components/AddButton'


const App = () => {

  const pageSize = 50;
  const [data, setData] = useState([])

  const [isLoading, setLoading] = useState(false)

  const [err, setError] = useState(null)

  const fetchData = async (limit) => {
    const url = {
      small: `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`,
      big: `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    }
    setLoading(true)
    try {

      const response = await fetch(url[limit])

      if (!response.ok) throw new Error('Ошибка сети')

      const json = await response.json()
      setData(json)

      setLoading(false)

      setError(null)
    } catch (e) {

      setError(e)
      setLoading(false)
    }

  }

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
    (colName !== sort.lastSorted && sort.reverseDir === true)
      ? reverse = sort.reverseDir
      : reverse = !sort.reverseDir

    setSort({ reverseDir: reverse, lastSorted: colName })
    setData(sorted)
  }

  const [term, setTerm] = useState({ filterItem: "", curPage: 0 })

  const filterVal = filterItem => (
    setTerm({ filterItem, curPage: 0 })
  )

  const getFilteredData = () => {

    if (data.length === 0) return []
    if (!term.filterItem) return data

    const searchTerm = term.filterItem.trim().toLowerCase()

    const arr = ["id", "firstName", "lastName", "email", "phone"];

    const filteredData = data.filter((elem) => {
      for (let prop of arr) {
        let propVal = elem[prop].toString().toLowerCase()
        if (~propVal.indexOf(searchTerm)) return true;
      }
      return false
    })
    return filteredData
  }

  const getPaginateData = () => {
    if (data.length === 0) return []

    const filteredData = getFilteredData()

    if (filteredData.length === 0) return []

    const split = (array, n) => {
      let [...arr] = array;
      let res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }
    return split(filteredData, pageSize)[term.curPage]

  }

  const getPageCount = data => (Math.ceil(data.length / pageSize))

  const pageClick = e => {
    setTerm(prev => ({ ...prev, curPage: e.selected }))
  }

  const [user, setUser] = useState(null)
  const onSelect = user => (
    setUser(user)
  )

  const [hidden, setHidden] = useState(true)

  const addUser = (userRow) => {
    setData([userRow, ...data])
  }


  return (
    <div className='container'>
      <h1>Table</h1>
      <div className='row'>
        {isLoading
          ? (<Loader />)
          : (
            <>
              <div className='eight columns'>
                <Filter filterVal={filterVal} />
                <button className="button-primary" onClick={() => setHidden(prev => !prev)}>Add</button>
                <button onClick={() => fetchData('small')}>Мало</button>
                <button onClick={() => fetchData('big')}>Много</button>
                {
                  hidden
                    ? null
                    : < AddButton addUser={addUser} />
                }

                <Table
                  data={getPaginateData()}
                  sortCol={sortCol}
                  isReverse={sort.reverseDir}
                  onSelect={onSelect}
                  lastSorted={sort.lastSorted}
                />

                {
                  !data.length
                    ? <div>Нет данных</div>
                    : null
                }
                {
                  err
                    ? <div style={{ color: 'tomato', border: '2px solid tomato', padding: '10px' }}>
                      {`${err.name}: ${err.message}`}
                    </div>
                    : null
                }

                <ReactPaginate
                  pageCount={getPageCount(getFilteredData())}
                  onPageChange={pageClick}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  breakLabel={'...'}
                  breakClassName={'item break-me'}
                  containerClassName={'pagination'}
                  activeClassName={'item active'}
                  disabledClassName={'disabled-page'}
                  nextClassName={"item next"}
                  pageClassName={'item pagination-page '}
                  previousClassName={"item previous"}
                />

              </div>

              <div className='three columns'>
                {user && <UserInfo user={user} />}
              </div>
            </>
          )}

      </div>
    </div>
  );


}

export default App;