import { useState } from 'react';
import { Pagination } from '@mui/material';
import './Table.css';
import Row from './Row';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';

function Table({
  records,
  firstRowIndex,
  lastRowIndex,
  recordsPerPage,
  handlePages,
}) {
  // useStates for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);

  //   change data
  const [data, setData] = useState(records);

  //   useStates for Modal-Add
  const [addModalActive, setAddModalActive] = useState(false);

  //   useStates for Modal-Delete
  const [delModalActive, setDelModalActive] = useState(false);
  const [rowKeyForDel, setRowKeyForDel] = useState(null);

  //   useStates for Modal-Edit
  const [editModalActive, setEditModalActive] = useState(false);
  const [rowKeyForEdit, setRowKeyForEdit] = useState(null);

  //   editable Parametrs
  const [editableData, setEditableData] = useState({
    color: '',
    price: '',
    avail: '',
  });

  //  additable Parametrs
  const [additableData, setAdditableData] = useState({
    availability: false,
    car: '',
    car_color: '',
    car_model: '',
    car_model_year: 0,
    car_vin: '',
    price: '',
  });

  //   Function for handle Search
  const handleSearchValue = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setSearchStatus(true);
  };

  // Function for delete Rows
  const removeData = () => {
    let newData = JSON.parse(localStorage.getItem('mainData'));

    const index = newData.findIndex((el) => el.id === rowKeyForDel);
    newData.splice(index, 1);

    localStorage.setItem('mainData', JSON.stringify(newData));
    setData(newData);
  };

  // Function for edit Rows
  const handleEdit = () => {
    let newData = JSON.parse(localStorage.getItem('mainData'));

    const index = newData.findIndex((el) => el.id === rowKeyForEdit);
    newData[index].car_color = editableData.color || newData[index].car_color;
    newData[index].price = editableData.price || newData[index].price;
    newData[index].availability =
      editableData.avail === ''
        ? newData[index].availability
        : editableData.avail === 'true'
        ? true
        : false;

    localStorage.setItem('mainData', JSON.stringify(newData));
    setData(newData);
  };

  const addData = () => {
    let newData = JSON.parse(localStorage.getItem('mainData'));

    newData.unshift(additableData);
    newData.forEach((el, index) => {
      el.id = index + 1;
    });

    localStorage.setItem('mainData', JSON.stringify(newData));
    setData(newData);
  };

  //   Function to gather values from inputs in edit modal
  const handleEditInputs = (e, name) => {
    setEditableData({ ...editableData, [name]: e.target.value });
  };

  //   Function to gather values from inputs in edit modal
  const handleAddInputs = (value, name) => {
    setAdditableData({
      ...additableData,
      [name]: value,
    });
    console.log(additableData);
  };

  //   filteredData for searching across table
  const filteredData = data.filter((obj) => {
    return Object.values(obj).some((val) => {
      return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  //   Determing pages when you serashing or not
  let numOfPages = searchStatus
    ? Math.ceil(filteredData.length / recordsPerPage)
    : Math.ceil(data.length / recordsPerPage);

  return (
    <>
      <div className='header'>
        <input
          type='text'
          placeholder='Search..'
          autoComplete='false'
          value={searchTerm}
          onChange={handleSearchValue}
          className='searchBar'
        />
        <button
          className='addBtn'
          onClick={() => {
            setAddModalActive(true);
          }}
        >
          Add car
        </button>
      </div>
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
                  setRowKeyForEdit={setRowKeyForEdit}
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
      <DeleteModal
        active={delModalActive}
        setActive={setDelModalActive}
        removeData={removeData}
      />
      <EditModal
        active={editModalActive}
        setActive={setEditModalActive}
        rowKeyForEdit={rowKeyForEdit}
        data={data}
        handleEdit={handleEdit}
        handleInputs={handleEditInputs}
      />
      <AddModal
        active={addModalActive}
        setActive={setAddModalActive}
        handleInputs={handleAddInputs}
        addData={addData}
      />
    </>
  );
}

export default Table;
