import './EditModal.css';

function EditModal({
  active,
  setActive,
  rowKeyForEdit,
  data,
  handleEdit,
  handleInputs,
  editableData,
}) {
  const editableRow = data.find((el) => el.id === rowKeyForEdit);
  return (
    <div className={`edit-modal ${active ? 'active' : ''}`}>
      <div className='edit-modal__body'>
        <h1 className='edit-modal__title'>Warning</h1>
        <p className='edit-modal__text'>Do you really want to edit the data?</p>

        <form
          className='edit-modal__inputs-container'
          onSubmit={(e) => {
            handleEdit(e);
            setActive(false);
          }}
        >
          <label>
            Company:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.car}
              disabled
            />
          </label>
          <label>
            Model:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.car_model}
              disabled
            />
          </label>
          <label>
            Vin:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.car_vin}
              disabled
            />
          </label>
          <label>
            Color:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.car_color}
              onChange={(e) => {
                handleInputs(e, 'color');
              }}
            />
          </label>
          <label>
            Year:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.car_model_year}
              disabled
            />
          </label>
          <label>
            Price:
            <input
              type='text'
              className='edit-modal__inputs'
              placeholder={editableRow?.price}
              onChange={(e) => {
                handleInputs(e, 'price');
              }}
            />
          </label>
          <label>
            Availability:
            <select
              className='edit-modal__inputs'
              onChange={(e) => {
                handleInputs(e, 'avail');
              }}
            >
              <option value='true'>Available</option>
              <option value=''>Not available</option>
            </select>
          </label>
          <div className='edit-modal__btn-container'>
            <button className='edit-modal__btn_del modal-btn' type='submit'>
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
        </form>
      </div>
    </div>
  );
}

export default EditModal;
