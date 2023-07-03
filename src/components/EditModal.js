import { useState, useEffect } from 'react';
import './EditModal.css';

function EditModal({
  active,
  setActive,
  rowKeyForEdit,
  data,
  handleEdit,
  handleInputs,
}) {
  const editableRow = data.find((el) => el.id === rowKeyForEdit);

  const [colorInVal, setColorInVal] = useState(editableRow?.car_color);
  const [priceInVal, setPriceInVal] = useState(editableRow?.price);

  useEffect(() => {
    setColorInVal(editableRow?.car_color);
    setPriceInVal(editableRow?.price);
  }, [editableRow]);

  //   useEffect(() => {
  //     setPriceInVal(editableRow?.price);
  //   }, [editableRow]);

  const handleColorIn = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      setColorInVal(value);
    }
  };

  const handlePriceIn = (event) => {
    const value = event.target.value;
    const regex = /^\$[0-9\s.]*$/;
    if (regex.test(value)) {
      setPriceInVal(value);
    }
  };

  return (
    <div className={`edit-modal ${active ? 'active' : ''}`}>
      <div className='edit-modal__body'>
        <h1 className='edit-modal__title'>Warning</h1>
        <p className='edit-modal__text'>Do you really want to edit the data?</p>

        <div className='edit-modal__inputs-container'>
          <div className='edit-modal__inputs-container_enabled'>
            <label className='edit-modal__label'>
              Color
              <input
                type='text'
                className='edit-modal__inputs'
                value={colorInVal}
                placeholder='Color'
                onChange={(e) => {
                  handleColorIn(e);
                  handleInputs(e, 'color');
                }}
              />
            </label>
            <label className='edit-modal__label'>
              Price
              <input
                type='text'
                className='edit-modal__inputs edit-modal__inputs_price'
                value={priceInVal}
                placeholder='Price'
                onChange={(e) => {
                  handlePriceIn(e);
                  handleInputs(e, 'price');
                }}
              />
            </label>
            <label className='edit-modal__label'>
              Availability
              <select
                defaultValue={''}
                className='edit-modal__inputs'
                onChange={(e) => {
                  handleInputs(e, 'avail');
                }}
              >
                <option value={''} disabled>
                  ...
                </option>
                <option value={'true'}>Available</option>
                <option value={'false'}>Not available</option>
              </select>
            </label>
          </div>

          <p className='edit-modal__tip'>
            * You can edit only these three columns
          </p>

          <div className='edit-modal__inputs-container_disabled'>
            <label className='edit-modal__label'>
              Company
              <input
                type='text'
                className='edit-modal__inputs'
                placeholder={editableRow?.car}
                disabled
              />
            </label>
            <label className='edit-modal__label'>
              Model
              <input
                type='text'
                className='edit-modal__inputs'
                placeholder={editableRow?.car_model}
                disabled
              />
            </label>
            <label className='edit-modal__label'>
              Vin
              <input
                type='text'
                className='edit-modal__inputs'
                placeholder={editableRow?.car_vin}
                disabled
              />
            </label>
            <label className='edit-modal__label'>
              Year
              <input
                type='text'
                className='edit-modal__inputs'
                placeholder={editableRow?.car_model_year}
                disabled
              />
            </label>
          </div>
        </div>
        <div className='edit-modal__btn-container'>
          <button
            className='edit-modal__btn_del modal-btn'
            onClick={() => {
              handleEdit();
              setActive(false);
            }}
          >
            Edit
          </button>
          <button
            className='edit-modal__btn_cls modal-btn'
            onClick={() => {
              setActive(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
