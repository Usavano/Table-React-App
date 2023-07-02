import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/Table';

function App() {
  const [carsData, setCarsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('mainData');

    if (storedData) {
      setCarsData(JSON.parse(storedData));
      setIsLoading(false);
    } else {
      fetch('https://myfakeapi.com/api/cars/')
        .then((response) => response.json())
        .then((data) => {
          setCarsData(data.cars);
          localStorage.setItem('mainData', JSON.stringify(data.cars));
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

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
