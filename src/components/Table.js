import { useState } from 'react';
import { Pagination } from '@mui/material';
import './Table.css';
import Row from './Row';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

function Table({
  records,
  firstRowIndex,
  lastRowIndex,
  recordsPerPage,
  handlePages,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [data, setData] = useState(records);

  //   useStates for Modal-Delete
  const [delModalActive, setDelModalActive] = useState(false);
  const [rowKeyForDel, setRowKeyForDel] = useState(null);

  //   useStates for Modal-Edit
  const [editModalActive, setEditModalActive] = useState(false);
  const [rowKeyForEdit, setRowKeyForEdit] = useState(null);

  const handleSearchValue = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setSearchStatus(true);
  };

  const removeData = () => {
    let newData = JSON.parse(localStorage.getItem('mainData'));
    newData = records.filter((el) => el.id !== rowKeyForDel);
    localStorage.setItem('mainData', JSON.stringify(newData));
    setData(newData);
  };

  const filteredData = data.filter((obj) => {
    return Object.values(obj).some((val) => {
      return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  let numOfPages = searchStatus
    ? Math.ceil(filteredData.length / recordsPerPage)
    : Math.ceil(data.length / recordsPerPage);

  return (
    <>
      <DeleteModal
        active={delModalActive}
        setActive={setDelModalActive}
        removeData={removeData}
      />
      <EditModal active={editModalActive} setActive={setEditModalActive} />
      <input
        type='text'
        placeholder='Search..'
        autoComplete='false'
        value={searchTerm}
        onChange={handleSearchValue}
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
          {(searchStatus ? filteredData : data)
            .map((car) => {
              return (
                <Row
                  {...car}
                  key={car.id}
                  setDelActive={setDelModalActive}
                  setRowKeyForDel={setRowKeyForDel}
                  setEditActive={setEditModalActive}
                />
              );
            })
            .slice(firstRowIndex, lastRowIndex)}
        </tbody>
      </table>
      <Pagination
        count={numOfPages}
        onChange={handlePages}
        size='large'
        variant='outlined'
        shape='rounded'
        className='table-container__pagination'
      />
    </>
  );
}

export default Table;
