import './DeleteModal.css';

function DeleteModal({ active, setActive }) {
  return (
    <div className={`delete-modal ${active ? 'active' : ''}`}>
      <div className='delete-modal__body'>
        <h1 className='delete-modal__title'>Are you sure?</h1>
        <button className='delete-modal__btn_del'>Delete</button>
        <button
          className='delete-modal__btn_cls'
          onClick={() => {
            setActive(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
