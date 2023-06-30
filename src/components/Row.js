import './Row.css';

function Row({
  car,
  car_model,
  car_color,
  car_model_year,
  car_vin,
  price,
  availability,
}) {
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
      <td className='tbody__item'>{''}</td>
    </tr>
  );
}

export default Row;
