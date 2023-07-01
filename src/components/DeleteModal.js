import './DeleteModal.css';

function DeleteModal({ active, setActive }) {
  return (
    <div className={`delete-modal ${active ? 'active' : ''}`}>
      <div className='delete-modal__body'>
        <h1 className='delete-modal__title'>Warning</h1>
        <p className='delete-modal__text'>
          Do you really want to delete the data?
        </p>
        <div className='delete-modal__btn-container'>
          <button className='delete-modal__btn_del modal-btn'>Delete</button>
          <button
            className='delete-modal__btn_cls modal-btn'
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

export default DeleteModal;
