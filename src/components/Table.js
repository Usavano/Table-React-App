import Row from './Row';
import './Table.css';

function Table({ records, srchVal, firstRowIndex, lastRowIndex }) {
  return (
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
        {records
          .filter((obj) => {
            return Object.values(obj).some((val) => {
              return val
                .toString()
                .toLowerCase()
                .includes(srchVal.toLowerCase());
            });
          })
          .map((car) => {
            return <Row {...car} key={car.id} />;
          })
          .slice(firstRowIndex, lastRowIndex)}
      </tbody>
    </table>
  );
}

export default Table;
