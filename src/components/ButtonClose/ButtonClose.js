import { ReactComponent as IconClose } from '../../images/icon-close.svg';

import s from './ButtonClose.module.css';

export default function ButtonClose({ onClose }) {
  return (
    <button className={s.btn} onClick={() => onClose()} type="button">
      <IconClose className={s.icon} />
    </button>
  );
}
