import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';
import NavPage from './components/NavBtns';
import { Pagination } from '@mui/material';

function App() {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  useEffect(() => {
    fetch('https://myfakeapi.com/api/cars/')
      .then((response) => response.json())
      .then((data) => setCarsData(data.cars));
  }, []);

  const lastRowIndex = currentPage * recordsPerPage;
  const firstRowIndex = lastRowIndex - recordsPerPage;
  const records = carsData.slice(firstRowIndex, lastRowIndex);

  const numberOfPages = Math.ceil(carsData.length / recordsPerPage);
  const nums = [...Array(numberOfPages + 1).keys()].slice(1);

  const handleChange = (e, p) => {
    setCurrentPage(p);
  };

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
      <input type='text' placeholder='Search..' autoComplete='false' />
      <Table records={records} />
      <Pagination
        count={numberOfPages}
        onChange={handleChange}
        size='large'
        variant='outlined'
        shape='rounded'
      />
    </div>
  );
}

export default App;
