import { ReactComponent as IconDown } from '../../images/down-icon.svg';

import s from './ButtonDown.module.css';

export default function ButtonDown() {
  return (
    <button title="down" className={s.btn} type="button">
      <IconDown className={s.icon} />
    </button>
  );
}