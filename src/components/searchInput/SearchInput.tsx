import {useState, useEffect} from 'react'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const inputHandler = (e: {target:{value: string}}) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase)
  }

  return (
    <div>
      <input type="search" name="search" value={searchTerm} onChange={inputHandler} />
    </div>
  )
}

export default Search