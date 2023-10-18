import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Import your custom modal styles

const Modal = ({ open, onClose, content }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {content}
          <button className="modal-close" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
