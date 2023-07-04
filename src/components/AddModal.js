import { useState } from 'react';
import './AddModal.css';

function AddModal({ active, setActive, handleInputs, addData }) {
  const [inputsData, setInputsData] = useState({
    company: '',
    model: '',
    vin: '',
    color: '',
    year: '',
    price: '',
    avail: '',
  });

  const handleInputValidation = (event) => {
    const { name, value } = event.target;
    let regex;

    if (name === 'company' || name === 'color') {
      regex = /^[a-zA-Z]*$/;
    } else if (name === 'model') {
      regex = /^[a-zA-Z0-9]*$/;
    } else if (name === 'vin') {
      regex = /^[A-Z0-9]*$/;
    } else if (name === 'year') {
      regex = /^[0-9]*$/;
    } else if (name === 'price') {
      regex = /^\$[0-9]*$/;
    }

    if (regex && regex.test(value)) {
      setInputsData((prevInputData) => ({
        ...prevInputData,
        [name]: value,
      }));
    }
  };

  const clearInputs = () => {
    for (let key in inputsData) {
      if (inputsData.hasOwnProperty(key)) {
        inputsData[key] = '';
      }
    }
  };

  return (
    <div className={`add-modal ${active ? 'active' : ''}`}>
      <div className='add-modal__body'>
        <h1 className='add-modal__title'>Add new car</h1>
        <p className='add-modal__text'>Do you really want to add new data?</p>

        <div className='add-modal__inputs-container'>
          <label className='add-modal__label'>
            Company
            <input
              type='text'
              name='company'
              value={inputsData.company}
              placeholder='Company'
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(e.target.value, 'car');
              }}
            />
            <p className='add-modal__descr'>* Only letters</p>
          </label>

          <label className='add-modal__label'>
            Model
            <input
              type='text'
              name='model'
              value={inputsData.model}
              placeholder='Model'
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(e.target.value, 'car_model');
              }}
            />
            <p className='add-modal__descr'>* Only letters or numbers</p>
          </label>

          <label className='add-modal__label'>
            Vin
            <input
              type='text'
              name='vin'
              value={inputsData.vin}
              maxLength={17}
              placeholder='Vin'
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(e.target.value, 'car_vin');
              }}
            />
            <p className='add-modal__descr'>
              * Only capital letters or numbers
            </p>
          </label>

          <label className='add-modal__label'>
            Color
            <input
              type='text'
              name='color'
              value={inputsData.color}
              placeholder='Color'
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(e.target.value, 'car_color');
              }}
            />
            <p className='add-modal__descr'>* Only letters</p>
          </label>

          <label className='add-modal__label'>
            Year
            <input
              type='text'
              name='year'
              value={inputsData.year}
              placeholder='Year'
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(parseInt(e.target.value), 'car_model_year');
              }}
            />
            <p className='add-modal__descr'>* Only numbers</p>
          </label>

          <label className='add-modal__label'>
            Price
            <input
              type='text'
              name='price'
              value={inputsData.price}
              placeholder='$Price'
              className='add-modal__inputs add-modal__inputs_price'
              onChange={(e) => {
                handleInputValidation(e);
                handleInputs(e.target.value, 'price');
              }}
            />
            <p className='add-modal__descr'>* Only numbers with dollar sign</p>
          </label>
          <label className='add-modal__label'>
            Availability
            <select
              required
              defaultValue={''}
              className='add-modal__inputs'
              onChange={(e) => {
                handleInputs(Boolean(e.target.value), 'availability');
              }}
            >
              <option value={''} selected disabled>
                ...
              </option>
              <option value='true'>Available</option>
              <option value=''>Not available</option>
            </select>
            <p className='add-modal__descr'>* This field required</p>
          </label>
        </div>
        <div className='add-modal__btn-container'>
          <button
            className='add-modal__btn_del modal-btn'
            onClick={() => {
              addData();
              setActive(false);
              clearInputs();
            }}
          >
            Add
          </button>
          <button
            className='add-modal__btn_cls modal-btn'
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

export default AddModal;
