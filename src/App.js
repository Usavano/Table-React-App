import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';

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

  const handlePages = (e, p) => {
    setCurrentPage(p);
  };

  return (
    <div className='app'>
      <Table
        records={carsData}
        firstRowIndex={firstRowIndex}
        lastRowIndex={lastRowIndex}
        recordsPerPage={recordsPerPage}
        handlePages={handlePages}
      />
    </div>
  );
}

export default App;
