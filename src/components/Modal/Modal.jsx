import { Component } from 'react';
import PropTypes from "prop-types";
import style from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }

  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleClick}>
        <div className={style.Modal}>
          <img
            src={this.props.picture}
            alt={this.props.alt}
            className={style.ModalPicture}
          />
        </div>
      </div>
    );
  }
}

export default Modal;


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    src: PropTypes.string.isRequired,
}
