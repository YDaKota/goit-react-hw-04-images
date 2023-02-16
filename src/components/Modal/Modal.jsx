import { useEffect } from 'react';
import PropTypes from "prop-types";
import style from './Modal.module.css';

const Modal = ({ picture, alt, onClose }) => {
  useEffect(() => {
    function onCloseByEsc(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
  window.addEventListener('keydown', onCloseByEsc);
  return () => {window.removeEventListener('keydown', onCloseByEsc)};
  }, [onClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return (
      <div className={style.Overlay} onClick={handleClick}>
        <div className={style.Modal}>
          <img
            src={picture}
            alt={alt}
            className={style.ModalPicture}
          />
        </div>
      </div>
    );
  }


export default Modal;


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    src: PropTypes.string.isRequired,
}
