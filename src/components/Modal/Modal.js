import s from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return (
    <div className={s.backdrop} onClick={() => onClose()}>
      <div className={s.content}>{children}</div>
    </div>
  );
}
