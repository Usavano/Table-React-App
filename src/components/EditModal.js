import './EditModal.css';

function EditModal({ active, setActive }) {
  return (
    <div className={`edit-modal ${active ? 'active' : ''}`}>
      <div className='edit-modal__body'>
        <h1 className='edit-modal__title'>Warning</h1>
        <p className='edit-modal__text'>Do you really want to edit the data?</p>

        <div className='edit-modal__inputs-container'>
          <p className='edit-modal__inputs'>1</p>
          <p className='edit-modal__inputs'>2</p>
          <p className='edit-modal__inputs'>3</p>
          <p className='edit-modal__inputs'>4</p>
          <p className='edit-modal__inputs'>5</p>
          <p className='edit-modal__inputs'>6</p>
          <p className='edit-modal__inputs'>7</p>
        </div>

        <div className='edit-modal__btn-container'>
          <button className='edit-modal__btn_del modal-btn'>Edit</button>
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
