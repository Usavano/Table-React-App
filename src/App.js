import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';
import { Pagination } from '@mui/material';

function App() {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://myfakeapi.com/api/cars/')
      .then((response) => response.json())
      .then((data) => setCarsData(data.cars));
  }, []);

  const lastRowIndex = currentPage * recordsPerPage;
  const firstRowIndex = lastRowIndex - recordsPerPage;
  //   const records = carsData.slice(firstRowIndex, lastRowIndex);

  const numberOfPages = Math.ceil(carsData.length / recordsPerPage);

  const handlePages = (e, p) => {
    setCurrentPage(p);
  };

  const handleSearchValue = (e) => {
    const searchValue = e.target.value;
    if (searchValue !== null) {
      setSearchTerm(searchValue);
    }
  };

  //   This normal functions for pagination
  //   const nextPage = () => {
  //     if (currentPage <= numberOfPages - 1) {
  //       setCurrentPage(currentPage + 1);
  //     }
  //   };
  //   const prevPage = () => {
  //     if (currentPage >= 2) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //   };
  //   const changeCurrPage = (id) => {
  //     setCurrentPage(id);
  //   };

  return (
    <div className='app'>
      <input
        type='text'
        placeholder='Search..'
        autoComplete='false'
        onInput={handleSearchValue}
      />
      <Table
        records={carsData}
        srchVal={searchTerm}
        firstRowIndex={firstRowIndex}
        lastRowIndex={lastRowIndex}
      />
      <Pagination
        count={numberOfPages}
        onChange={handlePages}
        size='large'
        variant='outlined'
        shape='rounded'
      />
    </div>
  );
}

export default App;
