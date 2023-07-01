import './Row.css';

function Row({
  car,
  car_model,
  car_vin,
  car_color,
  car_model_year,
  price,
  id,
  availability,
  setDelActive,
  setRowKey,
}) {
  const showModals = (e) => {
    if (e.target.value === 'Delete') {
      setDelActive(true);
      setRowKey(id);
      console.log(id);
    }
  };

  return (
    <tr className='tbody__row'>
      <td className='tbody__item'>{car}</td>
      <td className='tbody__item'>{car_model}</td>
      <td className='tbody__item'>{car_vin}</td>
      <td className='tbody__item'>{car_color}</td>
      <td className='tbody__item'>{car_model_year}</td>
      <td className='tbody__item'>{price}</td>
      <td className='tbody__item'>
        {availability ? 'Available' : 'Not available'}
      </td>
      <td className='tbody__item'>
        <select onChange={showModals} className='actions-list'>
          <option selected className='actions-list__item'>
            Choose on...
          </option>
          <option className='actions-list__item'>Edit</option>
          <option className='actions-list__item'>Delete</option>
        </select>
      </td>
    </tr>
  );
}

export default Row;
