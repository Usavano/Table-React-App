import Row from './Row';
import './Table.css';
import { Pagination } from '@mui/material';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

function Table({
  records,
  firstRowIndex,
  lastRowIndex,
  recordsPerPage,
  handlePages,
}) {
  const [delModalActive, setDelModalActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = records.filter((obj) => {
    return Object.values(obj).some((val) => {
      return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const numberOfPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleSearchValue = (e) => {
    const searchValue = e.target.value;
    if (searchValue !== null) {
      setSearchTerm(searchValue);
    }
  };

  return (
    <div className='table-container'>
      <DeleteModal active={delModalActive} setActive={setDelModalActive} />
      <input
        type='text'
        placeholder='Search..'
        autoComplete='false'
        onInput={handleSearchValue}
        className='searchBar'
      />
      <table className='table'>
        <thead className='table__head theader'>
          <tr className='theader__row'>
            <th className='theader__item'>Company</th>
            <th className='theader__item'>Model</th>
            <th className='theader__item'>Vin</th>
            <th className='theader__item'>Color</th>
            <th className='theader__item'>Year</th>
            <th className='theader__item'>Price</th>
            <th className='theader__item'>Availability</th>
            <th className='theader__item'>Actions columns</th>
          </tr>
        </thead>

        <tbody className='table_body tbody'>
          {filteredData
            .map((car) => {
              return (
                <Row {...car} key={car.id} setDelActive={setDelModalActive} />
              );
            })
            .slice(firstRowIndex, lastRowIndex)}
        </tbody>
      </table>
      <Pagination
        count={numberOfPages}
        onChange={handlePages}
        size='large'
        variant='outlined'
        shape='rounded'
        className='table-container__pagination'
      />
    </div>
  );
}

export default Table;
